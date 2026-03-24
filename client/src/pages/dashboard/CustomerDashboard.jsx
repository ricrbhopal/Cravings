import React from "react";
import Sidebar from "../../components/customerDashboard/Sidebar";
import CustomerOverview from "../../components/customerDashboard/CustomerOverview";
import CustomerOrders from "../../components/customerDashboard/CustomerOrders";
import CustomerSetting from "../../components/customerDashboard/CustomerSetting";
import { useLocation } from "react-router-dom";

const CustomerDashboard = () => {
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  return (
    <>
      <div className="h-[92vh] flex gap-2 m-2">
        <div className="w-3/17 bg-(--color-base-200) p-4 rounded-lg shadow-md h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-14/17 bg-(--color-base-100) p-4 rounded-lg shadow-md h-full">
          {activeTab === "overview" && <CustomerOverview />}
          {activeTab === "orders" && <CustomerOrders />}
          {activeTab === "settings" && <CustomerSetting />}
        </div>
      </div>
    </>
  );
};

export default CustomerDashboard;
