import React from "react";

const RiderDeliveries = () => {
  return (
    <div className="overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Deliveries</h2>
      <div className="bg-(--color-base-200) p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--color-secondary)">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Restaurant</th>
              <th className="text-left py-2">Delivery Location</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Earnings</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-(--color-secondary)">
              <td colSpan="5" className="text-center py-4 text-(--color-neutral)">
                No deliveries
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderDeliveries;
