import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";

const RestaurantSetting = () => {
  const { user } = useAuth();
  const [restaurantData, setRestaurantData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state for new restaurant
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    restaurantName: "",
    cuisineType: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    openingHours: "09:00",
    closingHours: "21:00",
    isOpen: true,
    geolocation: {
      lat: 0,
      lng: 0,
    },
    licence: {
      fssai: "",
      GST: "",
    },
    bankingDetails: {
      bankName: "",
      accountNumber: "",
      IFSC: "",
      UPI: "",
    },
    images: [],
  });

  // State for managing images in edit mode
  const [editImages, setEditImages] = useState([]);

  // State for profile editing
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    photo: user?.photo || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        photo: user.photo || "",
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user?.fullName, user?.email, user?.phone, user?.photo]);

  useEffect(() => {
    if (user?._id) {
      fetchRestaurantData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchRestaurantData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/restaurant/${user._id}`);
      setRestaurantData(response.data.data);
      setEditData(response.data.data);
      setEditImages([]);
    } catch (err) {
      if (err.response?.status === 404) {
        setRestaurantData(null);
        setEditData(null);
      } else {
        toast.error(
          err.response?.data?.message || "Failed to fetch restaurant data",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Registration form handlers
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNestedFormChange = (e, parent) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleGeolocationFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      geolocation: {
        ...formData.geolocation,
        [name]: parseFloat(value),
      },
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages],
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setEditImages([...editImages, ...newImages]);
  };

  const removeEditImage = (index) => {
    setEditImages(editImages.filter((_, i) => i !== index));
  };

  const handleCreateRestaurant = async () => {
    try {
      // Validation
      if (
        !formData.restaurantName ||
        !formData.cuisineType ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.zipCode ||
        !formData.country ||
        !formData.licence.fssai ||
        !formData.licence.GST ||
        !formData.bankingDetails.bankName ||
        !formData.bankingDetails.accountNumber ||
        !formData.bankingDetails.IFSC ||
        !formData.bankingDetails.UPI
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      setIsSaving(true);
      const response = await api.post(`/restaurant/${user._id}`, formData);
      setRestaurantData(response.data.data);
      setEditData(response.data.data);
      toast.success("Restaurant profile created successfully!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create restaurant profile",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Edit mode handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleNestedChange = (e, parent) => {
    const { name, value, type, checked } = e.target;
    setEditData({
      ...editData,
      [parent]: {
        ...editData[parent],
        [name]: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleGeolocationChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      geolocation: {
        ...editData.geolocation,
        [name]: parseFloat(value),
      },
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // Note: If you have new images in editImages array, send them separately to your image upload endpoint
      // The editImages array contains objects with { file, preview } structure
      // You can handle this in your backend integration
      const response = await api.put(`/restaurant/${user._id}`, editData);
      setRestaurantData(response.data.data);
      setEditImages([]);
      setIsEditing(false);
      toast.success("Restaurant updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update restaurant");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(restaurantData);
    setIsEditing(false);
  };

  // Profile editing handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({
          ...profileData,
          photo: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      // Update user profile via API
      const response = await api.put(`/user/${user._id}`, {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        photo: profileData.photo,
      });
      toast.success("Profile updated successfully!");
      setEditingProfile(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // ===== REGISTRATION FORM VIEW =====
  if (isLoading) {
    return (
      <div className="overflow-y-auto h-full space-y-6 p-6">
        <p className="text-(--color-neutral) text-center py-8">
          Loading restaurant data...
        </p>
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div className="overflow-y-auto h-full space-y-6">
        <h2 className="text-2xl font-bold px-6 pt-6">
          Restaurant Registration
        </h2>

        {/* Profile */}
        <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md mx-6">
          {/* Profile Section */}

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
                  src={profileData.photo?.url}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-2 border-(--color-primary)"
                />
                <div className="grid md:grid-cols-2 gap-4">
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
                    src={profileData.photo?.url}
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
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border border-(--color-secondary) rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone
                </label>
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

        {/* Registration Form */}
        <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md mx-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Complete Your Restaurant Profile
          </h3>
          <p className="text-(--color-neutral) text-sm mb-6">
            Please fill in all the required information to set up your
            restaurant.
          </p>

          <div className="space-y-4">
            {/* Basic Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                Basic Information *
              </h4>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleFormChange}
                  placeholder="Enter restaurant name"
                  className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Cuisine Type
                </label>
                <input
                  type="text"
                  name="cuisineType"
                  value={formData.cuisineType}
                  onChange={handleFormChange}
                  placeholder="e.g., Italian, Chinese, Indian"
                  className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                Address Information *
              </h4>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Enter street address"
                  className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleFormChange}
                    placeholder="Zip code"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    placeholder="Country"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Operating Hours *</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    name="openingHours"
                    value={formData.openingHours}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    name="closingHours"
                    value={formData.closingHours}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Status
                  </label>
                  <label className="flex items-center px-3 py-2 border border-(--color-secondary) rounded text-sm">
                    <input
                      type="checkbox"
                      name="isOpen"
                      checked={formData.isOpen}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    <span>Currently Open</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Geolocation */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                Location Coordinates
              </h4>
              <p className="text-xs text-(--color-neutral) mb-2">
                Enter your restaurant's GPS coordinates
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="lat"
                    value={formData.geolocation.lat}
                    onChange={handleGeolocationFormChange}
                    step="0.000001"
                    placeholder="0.0"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="lng"
                    value={formData.geolocation.lng}
                    onChange={handleGeolocationFormChange}
                    step="0.000001"
                    placeholder="0.0"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* License Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                License Information *
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    FSSAI License Number
                  </label>
                  <input
                    type="text"
                    name="fssai"
                    value={formData.licence.fssai}
                    onChange={(e) => handleNestedFormChange(e, "licence")}
                    placeholder="Enter FSSAI license number"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    GST Number
                  </label>
                  <input
                    type="text"
                    name="GST"
                    value={formData.licence.GST}
                    onChange={(e) => handleNestedFormChange(e, "licence")}
                    placeholder="Enter GST number"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Banking Details *</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankingDetails.bankName}
                    onChange={(e) =>
                      handleNestedFormChange(e, "bankingDetails")
                    }
                    placeholder="Enter bank name"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.bankingDetails.accountNumber}
                    onChange={(e) =>
                      handleNestedFormChange(e, "bankingDetails")
                    }
                    placeholder="Enter account number"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="IFSC"
                    value={formData.bankingDetails.IFSC}
                    onChange={(e) =>
                      handleNestedFormChange(e, "bankingDetails")
                    }
                    placeholder="Enter IFSC code"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    name="UPI"
                    value={formData.bankingDetails.UPI}
                    onChange={(e) =>
                      handleNestedFormChange(e, "bankingDetails")
                    }
                    placeholder="Enter UPI ID"
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Restaurant Images</h4>
              <p className="text-xs text-(--color-neutral) mb-3">
                Upload images of your restaurant for customers to view
              </p>

              {/* Image Upload Input */}
              <div>
                <label
                  htmlFor="AddImages"
                  className="block text-sm font-semibold mb-2 cursor-pointer w-full px-3 py-2 border border-(--color-secondary) rounded text-center"
                >
                  Add Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="AddImages"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Display Uploaded Images */}
              {formData.images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-(--color-neutral)">
                    Uploaded Images: {formData.images.length}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Restaurant ${idx + 1}`}
                          className="w-full h-64 object-contain rounded border border-(--color-secondary)"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 justify-end pt-4">
              <button
                onClick={handleCreateRestaurant}
                className="bg-(--color-primary) text-(--color-primary-content) px-6 py-2 rounded text-sm font-semibold disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? "Creating Profile..." : "Create Restaurant Profile"}
              </button>
            </div>

            <p className="text-xs text-(--color-neutral) mt-4">
              * All fields marked with asterisk are required to complete your
              restaurant profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== NORMAL VIEW/EDIT MODE =====
  return (
    <div className="overflow-y-auto h-full space-y-6">
      <h2 className="text-2xl font-bold px-6 pt-6">Settings</h2>

      {/* Profile */}
      <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md mx-6">
        <h3 className="text-xl font-semibold mb-4">Profile</h3>
        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-(--color-base-100) p-3 rounded">
              <p className="text-sm text-(--color-neutral) mb-1">Full Name</p>
              <p className="font-semibold">{user.fullName}</p>
            </div>
            <div className="bg-(--color-base-100) p-3 rounded">
              <p className="text-sm text-(--color-neutral) mb-1">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div className="bg-(--color-base-100) p-3 rounded">
              <p className="text-sm text-(--color-neutral) mb-1">Phone</p>
              <p className="font-semibold">{user.phone}</p>
            </div>
            <div className="bg-(--color-base-100) p-3 rounded">
              <p className="text-sm text-(--color-neutral) mb-1">User Type</p>
              <p className="font-semibold capitalize">{user.userType}</p>
            </div>
          </div>
        ) : (
          <p className="text-(--color-neutral)">No user data available</p>
        )}
      </div>

      {/* Restaurant Settings */}
      <div className="bg-(--color-base-200) p-6 rounded-lg shadow-md mx-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Restaurant Settings</h3>
          {restaurantData && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded text-sm"
            >
              <MdEdit /> Edit
            </button>
          )}
        </div>

        {restaurantData && editData ? (
          <div className="space-y-4">
            {/* Basic Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Restaurant Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="restaurantName"
                      value={editData.restaurantName || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.restaurantName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Cuisine Type
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="cuisineType"
                      value={editData.cuisineType || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.cuisineType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Address</h4>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Street Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editData.address || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                  />
                ) : (
                  <p className="px-3 py-2 text-sm">{restaurantData.address}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={editData.city || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">{restaurantData.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={editData.state || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">{restaurantData.state}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Zip Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="zipCode"
                      value={editData.zipCode || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.zipCode}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={editData.country || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.country}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Operating Hours</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Opening Hours
                  </label>
                  {isEditing ? (
                    <input
                      type="time"
                      name="openingHours"
                      value={editData.openingHours || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.openingHours}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Closing Hours
                  </label>
                  {isEditing ? (
                    <input
                      type="time"
                      name="closingHours"
                      value={editData.closingHours || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.closingHours}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Status
                  </label>
                  {isEditing ? (
                    <label className="flex items-center px-3 py-2">
                      <input
                        type="checkbox"
                        name="isOpen"
                        checked={editData.isOpen}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm">Currently Open</span>
                    </label>
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.isOpen ? "✅ Open" : "❌ Closed"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Geolocation */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Geolocation</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Latitude
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="lat"
                      value={editData.geolocation?.lat || ""}
                      onChange={(e) => handleGeolocationChange(e)}
                      step="0.000001"
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.geolocation?.lat}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Longitude
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="lng"
                      value={editData.geolocation?.lng || ""}
                      onChange={(e) => handleGeolocationChange(e)}
                      step="0.000001"
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.geolocation?.lng}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* License Information */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">
                License Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    FSSAI License
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fssai"
                      value={editData.licence?.fssai || ""}
                      onChange={(e) => handleNestedChange(e, "licence")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.licence?.fssai}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    GST Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="GST"
                      value={editData.licence?.GST || ""}
                      onChange={(e) => handleNestedChange(e, "licence")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.licence?.GST}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Banking Details */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Banking Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Bank Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bankName"
                      value={editData.bankingDetails?.bankName || ""}
                      onChange={(e) => handleNestedChange(e, "bankingDetails")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.bankingDetails?.bankName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Account Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="accountNumber"
                      value={editData.bankingDetails?.accountNumber || ""}
                      onChange={(e) => handleNestedChange(e, "bankingDetails")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.bankingDetails?.accountNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    IFSC Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="IFSC"
                      value={editData.bankingDetails?.IFSC || ""}
                      onChange={(e) => handleNestedChange(e, "bankingDetails")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.bankingDetails?.IFSC}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    UPI ID
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="UPI"
                      value={editData.bankingDetails?.UPI || ""}
                      onChange={(e) => handleNestedChange(e, "bankingDetails")}
                      className="w-full px-3 py-2 border border-(--color-secondary) rounded text-sm"
                    />
                  ) : (
                    <p className="px-3 py-2 text-sm">
                      {restaurantData.bankingDetails?.UPI}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-(--color-base-100) p-4 rounded space-y-3">
              <h4 className="font-semibold text-sm mb-3">Restaurant Images</h4>
              {!isEditing ? (
                // View Mode - Display existing images
                restaurantData.images && restaurantData.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {restaurantData.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.URL}
                        alt={`Restaurant ${idx + 1}`}
                        className="w-full h-64 object-contain rounded border border-(--color-secondary)"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-(--color-neutral)">
                    No images added yet
                  </p>
                )
              ) : (
                // Edit Mode - Allow image upload
                <div className="space-y-3">
                  <p className="text-xs text-(--color-neutral)">
                    Upload new images of your restaurant
                  </p>

                  {/* Existing Images */}
                  {restaurantData.images &&
                    restaurantData.images.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-(--color-neutral)">
                          Existing Images: {restaurantData.images.length}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                          {restaurantData.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.URL}
                              alt={`Restaurant ${idx + 1}`}
                              className="w-full h-64 object-contain rounded border border-(--color-secondary)"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                  {/* New Images Upload */}
                  <div>
                    <label
                      htmlFor="AddNewImages"
                      className="block text-sm font-semibold mb-2 cursor-pointer w-full px-3 py-2 border border-(--color-secondary) rounded text-center"
                    >
                      Add New Images
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      id="AddNewImages"
                      onChange={handleEditImageUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Display New Uploaded Images */}
                  {editImages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-(--color-neutral)">
                        New Images: {editImages.length}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                        {editImages.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img.preview}
                              alt={`New ${idx + 1}`}
                              className="w-full h-64 object-contain rounded border border-(--color-secondary)"
                            />
                            <button
                              onClick={() => removeEditImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-2 justify-end pt-4">
                <button
                  onClick={handleCancel}
                  className="bg-(--color-secondary) text-(--color-secondary-content) px-4 py-2 rounded text-sm font-semibold"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RestaurantSetting;
