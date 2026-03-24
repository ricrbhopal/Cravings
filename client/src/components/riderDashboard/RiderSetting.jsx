import React from "react";

const RiderSetting = () => {
  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="space-y-4">
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Account Settings</h3>
          <button className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Vehicle Information</h3>
          <button className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded">
            Update Vehicle Details
          </button>
        </div>
        <div className="bg-(--color-base-200) p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Bank Details</h3>
          <button className="bg-(--color-primary) text-(--color-primary-content) px-4 py-2 rounded">
            Update Bank Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderSetting;
