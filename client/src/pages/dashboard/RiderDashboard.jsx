import React from "react";
import Sidebar from "../../components/riderDashboard/Sidebar";
import RiderOverview from "../../components/riderDashboard/RiderOverview";
import RiderDeliveries from "../../components/riderDashboard/RiderDeliveries";
import RiderEarnings from "../../components/riderDashboard/RiderEarnings";
import RiderSetting from "../../components/riderDashboard/RiderSetting";
import { useLocation } from "react-router-dom";

const RiderDashboard = () => {
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  return (
    <>
      <div className="h-[92vh] flex gap-2 m-2">
        <div className="w-3/17 bg-(--color-base-200) p-4 rounded-lg shadow-md h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-14/17 bg-(--color-base-100) p-4 rounded-lg shadow-md h-full">
          {activeTab === "overview" && <RiderOverview />}
          {activeTab === "deliveries" && <RiderDeliveries />}
          {activeTab === "earnings" && <RiderEarnings />}
          {activeTab === "settings" && <RiderSetting />}
        </div>
      </div>
    </>
  );
};

export default RiderDashboard;