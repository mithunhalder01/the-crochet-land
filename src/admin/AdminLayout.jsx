import Sidebar from "./components/Sidebar";
import AdminNavbar from "./components/AdminNavbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}