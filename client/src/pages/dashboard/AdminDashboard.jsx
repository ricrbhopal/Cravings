import React from "react";
import Sidebar from "../../components/adminDashboard/Sidebar";
import AdminOverview from "../../components/adminDashboard/AdminOverview";
import AdminUsers from "../../components/adminDashboard/AdminUsers";
import AdminReports from "../../components/adminDashboard/AdminReports";
import AdminSetting from "../../components/adminDashboard/AdminSetting";
import { useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const active = useLocation().state?.activeTab;
  const [activeTab, setActiveTab] = React.useState(active || "overview");

  return (
    <>
      <div className="h-[92vh] flex gap-2 m-2">
        <div className="w-3/17 bg-(--color-base-200) p-4 rounded-lg shadow-md h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-14/17 bg-(--color-base-100) p-4 rounded-lg shadow-md h-full">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "reports" && <AdminReports />}
          {activeTab === "settings" && <AdminSetting />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;