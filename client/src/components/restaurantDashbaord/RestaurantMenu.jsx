import React, { useState, useEffect } from "react";
import api from "../../config/ApiConfig";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import MenuItemModal from "./modals/MenuItemModal";

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState("available"); // all, available, unavailable

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/menu/get-items");
      setMenuItems(response.data.data.items || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch menu items",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/menu/delete-item/${itemId}`);
        toast.success("Item deleted successfully");
        fetchMenuItems();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete item");
      }
    }
  };

  const handleToggleAvailability = async (itemId, currentStatus) => {
    try {
      await api.patch(`/menu/mark-unavailable/${itemId}`, {
        isAvailable: !currentStatus,
      });
      toast.success(
        `Item marked ${!currentStatus ? "available" : "unavailable"}`,
      );
      fetchMenuItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleToggleDiscontinued = async (itemId, currentStatus) => {
    try {
      await api.patch(`/menu/mark-discontinued/${itemId}`, {
        isDiscontinued: !currentStatus,
      });
      toast.success(
        `Item marked ${!currentStatus ? "discontinued" : "active"}`,
      );
      fetchMenuItems();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingItem(null);
  };

  const handleModalSuccess = () => {
    handleModalClose();
    fetchMenuItems();
  };

  const filteredItems = menuItems.filter((item) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "available")
      return item.isAvailable && !item.isDiscontinued;
    if (filterStatus === "unavailable")
      return !item.isAvailable || item.isDiscontinued;
    return true;
  });

  if (isLoading && menuItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-(--color-neutral)">Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Restaurant Menu</h2>
        {filteredItems.length !== 0 && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-(--color-primary-content) rounded font-semibold hover:opacity-90 transition cursor-pointer"
          >
            <FaPlus /> Add Menu Item
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 border-b border-(--color-secondary)">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 font-semibold transition ${
            filterStatus === "all"
              ? "border-b-2 border-(--color-primary) text-(--color-primary)"
              : "text-(--color-neutral)"
          }`}
        >
          All Items ({menuItems.length})
        </button>
        <button
          onClick={() => setFilterStatus("available")}
          className={`px-4 py-2 font-semibold transition ${
            filterStatus === "available"
              ? "border-b-2 border-(--color-success) text-(--color-success)"
              : "text-(--color-neutral)"
          }`}
        >
          Available (
          {
            menuItems.filter((item) => item.isAvailable && !item.isDiscontinued)
              .length
          }
          )
        </button>
        <button
          onClick={() => setFilterStatus("unavailable")}
          className={`px-4 py-2 font-semibold transition ${
            filterStatus === "unavailable"
              ? "border-b-2 border-(--color-warning) text-(--color-warning)"
              : "text-(--color-neutral)"
          }`}
        >
          Unavailable/Discontinued (
          {
            menuItems.filter((item) => !item.isAvailable || item.isDiscontinued)
              .length
          }
          )
        </button>
      </div>

      {/* Menu Items Table */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-(--color-neutral) text-lg mb-4">
            No menu items found
          </p>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-(--color-primary) text-(--color-primary-content) rounded font-semibold hover:opacity-90 transition cursor-pointer"
          >
            Add First Item
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-(--color-base-100) rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-(--color-base-200)">
              <tr className="border-b border-(--color-secondary)">
                <th className="text-left px-4 py-3 font-semibold">Item Name</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-left px-4 py-3 font-semibold">Price</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">
                  Availability
                </th>
                <th className="text-left px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-(--color-secondary) hover:bg-(--color-base-200) transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.image?.url && (
                        <img
                          src={item.image.url}
                          alt={item.itemName}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{item.itemName}</p>
                        <p className="text-sm text-(--color-secondary) line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-(--color-accent) text-(--color-accent-content) text-xs font-semibold rounded capitalize">
                      {item.foodType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">₹{item.price}</td>
                  <td className="px-4 py-3">
                    {item.isDiscontinued ? (
                      <span className="px-2 py-1 bg-(--color-error) text-(--color-error-content) text-xs font-semibold rounded">
                        Discontinued
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-(--color-success) text-(--color-success-content) text-xs font-semibold rounded">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleToggleAvailability(item._id, item.isAvailable)
                        }
                        className={`p-2 rounded transition ${
                          item.isAvailable
                            ? "bg-(--color-success) text-(--color-success-content) hover:opacity-80"
                            : "bg-(--color-warning) text-(--color-warning-content) hover:opacity-80"
                        }`}
                        title={
                          item.isAvailable
                            ? "Mark Unavailable"
                            : "Mark Available"
                        }
                      >
                        {item.isAvailable ? (
                          <MdCheckCircle className="cursor-pointer" />
                        ) : (
                          <MdCancel className="cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleToggleDiscontinued(
                            item._id,
                            item.isDiscontinued,
                          )
                        }
                        className={`px-3 py-1 text-xs font-semibold rounded transition ${
                          item.isDiscontinued
                            ? "bg-(--color-info) text-(--color-info-content) hover:opacity-80"
                            : "border border-(--color-secondary) text-(--color-neutral) hover:bg-(--color-base-200)"
                        }`}
                        title={
                          item.isDiscontinued ? "Mark as Active" : "Discontinue"
                        }
                      >
                        {item.isDiscontinued ? "Active" : "Discontinue"}
                      </button>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 bg-(--color-primary) text-(--color-primary-content) rounded hover:opacity-80 transition cursor-pointer"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="p-2 bg-(--color-error) text-(--color-error-content) rounded hover:opacity-80 transition cursor-pointer"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Menu Item Modal */}
      {showModal && (
        <MenuItemModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;
