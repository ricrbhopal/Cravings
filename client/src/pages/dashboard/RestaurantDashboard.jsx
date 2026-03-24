import React from "react";
import Sidebar from "../../components/restaurantDashbaord/Sidebar";
import RestaurantOverview from "../../components/restaurantDashbaord/RestaurantOverview";
import RestaurantOrders from "../../components/restaurantDashbaord/RestaurantOrders";
import RestaurantMenu from "../../components/restaurantDashbaord/RestaurantMenu";
import RestaurantReviews from "../../components/restaurantDashbaord/RestaurantReviews";
import RestaurantSetting from "../../components/restaurantDashbaord/RestaurantSetting";
import { useLocation } from "react-router-dom";

const RestaurantDashboard = () => {
  const active = useLocation().state?.activeTab;
 // console.log(active);

  const [activeTab, setActiveTab] = React.useState(active || "overview");

  return (
    <>
      <div className="h-[92vh] flex gap-2 m-2">
        <div className="w-3/17 bg-(--color-base-200) p-4 rounded-lg shadow-md h-full">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="w-14/17 bg-(--color-base-100) p-4 rounded-lg shadow-md h-full">
          {activeTab === "overview" && <RestaurantOverview />}
          {activeTab === "orders" && <RestaurantOrders />}
          {activeTab === "menu" && <RestaurantMenu />}
          {activeTab === "reviews" && <RestaurantReviews />}
          {activeTab === "settings" && <RestaurantSetting />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;
