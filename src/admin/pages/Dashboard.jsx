import StatsGrid from "../components/StatsGrid";
import RevenueChart from "../components/RevenueChart";
import OrdersPie from "../components/OrdersPie";
import RecentOrders from "../components/RecentOrders";
import LowStock from "../components/LowStock";
import TopProducts from "../components/TopProducts";
import MonthlyBarChart from "../components/MonthlyBarChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <StatsGrid />

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <RevenueChart />
        <OrdersPie />
      </div>

      {/* Tables */}
      <div className="grid md:grid-cols-2 gap-6">
        <RecentOrders />
        <LowStock />
      </div>

      <div>
        <MonthlyBarChart />
      </div>

      {/* Top Products */}
      <TopProducts />

    </div>
  );
}