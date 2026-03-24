import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const CustomerSetting = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    photo: user?.photo?.url || "https://via.placeholder.com/150",
  });

  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
  });

  const [addressFormData, setAddressFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Fetch addresses on component mount
  useEffect(() => {
    if (user?.id) {
      fetchAddresses();
    }
  }, [user?.id]);

  // Update formData when profileData changes
  useEffect(() => {
    setFormData({
      fullName: profileData.fullName,
      email: profileData.email,
      phone: profileData.phone,
    });
  }, [profileData]);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/customer/addresses`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cravingsToken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cravingsToken")}`,
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            photo: profileData.photo,
          }),
        }
      );

      if (response.ok) {
        setProfileData({ ...profileData, ...formData });
        setEditingProfile(false);
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleAddAddress = async () => {
    if (
      !addressFormData.address ||
      !addressFormData.city ||
      !addressFormData.state ||
      !addressFormData.zipCode ||
      !addressFormData.country
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/customer/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cravingsToken")}`,
          },
          body: JSON.stringify(addressFormData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAddresses([...addresses, data.address]);
        setAddressFormData({
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        });
        setShowAddressForm(false);
        toast.success("Address added successfully");
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Error adding address");
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address._id);
    setAddressFormData(address);
  };

  const handleUpdateAddress = async () => {
    if (
      !addressFormData.address ||
      !addressFormData.city ||
      !addressFormData.state ||
      !addressFormData.zipCode ||
      !addressFormData.country
    ) {
      toast.error("Please fill all address fields");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/customer/address/${editingAddress}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("cravingsToken")}`,
          },
          body: JSON.stringify(addressFormData),
        }
      );

      if (response.ok) {
        setAddresses(
          addresses.map((addr) =>
            addr._id === editingAddress ? { ...addr, ...addressFormData } : addr
          )
        );
        setEditingAddress(null);
        setAddressFormData({
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
        });
        toast.success("Address updated successfully");
      } else {
        toast.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      toast.error("Error updating address");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/customer/address/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("cravingsToken")}`,
          },
        }
      );

      if (response.ok) {
        setAddresses(addresses.filter((addr) => addr._id !== id));
        toast.success("Address deleted successfully");
      } else {
        toast.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Error deleting address");
    }
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressFormData({
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
  };

  return (
    <div className="overflow-y-auto h-full space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      {/* Profile Section */}
      <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Profile Information</h3>
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
          >
            <MdEdit /> {editingProfile ? "Cancel" : "Edit"}
          </button>
        </div>

        {!editingProfile ? (
          // Display Mode
          <div>
            <div className="flex items-center gap-6 mb-6">
              <img
                src={profileData.photo}
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border-2 border-(--color-primary)"
              />
              <div>
                <p className="text-sm text-(--color-neutral) mb-1">Name</p>
                <p className="font-semibold mb-3">{profileData.fullName}</p>
                <p className="text-sm text-(--color-neutral) mb-1">Email</p>
                <p className="font-semibold mb-3">{profileData.email}</p>
                <p className="text-sm text-(--color-neutral) mb-1">Phone</p>
                <p className="font-semibold">{profileData.phone}</p>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <div className="space-y-4">
            <div> 
              <label className="block text-sm font-semibold mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-(--color-primary)"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="flex-1 px-3 py-2 border border-(--color-secondary) rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-(--color-secondary) rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-(--color-secondary) rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-(--color-secondary) rounded"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="bg-(--color-primary) text-(--color-primary-content) px-6 py-2 rounded font-semibold"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Address Book Section */}
      <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Address Book</h3>
          {!showAddressForm && editingAddress === null && (
            <button
              onClick={() => setShowAddressForm(true)}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
            >
              <MdAdd /> Add Address
            </button>
          )}
        </div>

        {/* Address Form */}
        {(showAddressForm || editingAddress !== null) && (
          <div className="bg-(--color-base-100) p-4 rounded mb-4 space-y-3">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={addressFormData.address}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={addressFormData.city}
                onChange={handleAddressChange}
                className="px-3 py-2 border border-(--color-secondary) rounded text-sm"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={addressFormData.state}
                onChange={handleAddressChange}
                className="px-3 py-2 border border-(--color-secondary) rounded text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={addressFormData.zipCode}
                onChange={handleAddressChange}
                className="px-3 py-2 border border-(--color-secondary) rounded text-sm"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={addressFormData.country}
                onChange={handleAddressChange}
                className="px-3 py-2 border border-(--color-secondary) rounded text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={
                  editingAddress !== null
                    ? handleUpdateAddress
                    : handleAddAddress
                }
                className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded text-sm font-semibold"
              >
                {editingAddress !== null ? "Update" : "Add"} Address
              </button>
              <button
                onClick={handleCancelAddressForm}
                className="bg-(--color-secondary) text-(--color-secondary-content) px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Addresses List */}
        <div className="space-y-3">
          {loadingAddresses ? (
            <p className="text-(--color-neutral) text-sm">Loading addresses...</p>
          ) : addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className="bg-(--color-base-100) p-3 rounded flex justify-between items-start"
              >
                <div className="text-sm">
                  <p className="font-semibold">{address.address}</p>
                  <p className="text-(--color-neutral)">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-(--color-neutral)">{address.country}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-(--color-primary) hover:bg-(--color-base-200) p-2 rounded"
                  >
                    <MdEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="text-red-500 hover:bg-(--color-base-200) p-2 rounded"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-(--color-neutral) text-sm">
              No saved addresses yet
            </p>
          )}
        </div>
      </div>

      {/* Account Status Section */}
      <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Account Status</h3>
        <div className="space-y-3">
          <div className="bg-(--color-base-100) p-3 rounded">
            <p className="text-sm text-(--color-neutral)">Status</p>
            <p className="font-semibold">✅ Active</p>
          </div>
          <button className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetting;
