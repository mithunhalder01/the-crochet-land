import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside
      className="
        group
        sticky top-6
        h-[calc(100vh-3rem)]
        ml-4
        my-6
        w-20
        hover:w-64
        transition-all duration-300 ease-in-out
        bg-white
        text-slate-600
        rounded-[24px] 
        flex flex-col justify-between
        shadow-[0_8px_30px_rgb(0,0,0,0.04)]
        border border-slate-100
        z-50
      "
    >
      {/* Top Section: Logo/Brand */}
      <div className="flex flex-col h-full overflow-hidden">
        <div className="h-20 flex items-center px-6 mb-2 border-b border-slate-50 overflow-hidden">
          <div className="min-w-[32px] w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold text-sm tracking-tight whitespace-nowrap text-slate-800">
            Admin Console
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 mt-4 px-3 flex-grow">
          <SidebarItem to="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <SidebarItem to="/admin/products" icon={<Package size={20} />} label="Products" />
          <SidebarItem to="/admin/orders" icon={<ShoppingCart size={20} />} label="Orders" />
          <SidebarItem to="/admin/users" icon={<Users size={20} />} label="Users" />
        </nav>

        {/* Bottom Section: Profile & Logout */}
        <div className="p-3 mt-auto bg-slate-50/50 rounded-b-[24px] overflow-hidden">
          {/* Profile Card */}
          <div className="flex items-center gap-3 p-2 mb-2 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="min-w-[32px] w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {user?.email?.charAt(0).toUpperCase() || "S"}
            </div>
            <div className="hidden group-hover:block transition-all duration-300 min-w-0">
              <p className="text-[11px] font-semibold text-slate-800 truncate w-32">
                {user?.email || "sarah.chen@mail.com"}
              </p>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Admin</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="
              flex items-center gap-4
              w-full
              p-3 rounded-xl
              text-slate-500
              hover:bg-red-50 hover:text-red-600
              transition-all duration-200
            "
          >
            <div className="shrink-0">
               <LogOut size={20} />
            </div>
            <span className="hidden group-hover:block transition-all duration-300 text-sm font-medium whitespace-nowrap">
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-4
        p-3 rounded-xl
        transition-all duration-300
        group/item
        ${
          isActive
            ? "bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
        }
        `
      }
    >
      <div className={`shrink-0 transition-transform duration-300 group-hover/item:scale-110`}>
        {icon}
      </div>
      
      <span className="hidden group-hover:block transition-all duration-300 text-sm font-medium whitespace-nowrap">
        {label}
      </span>
    </NavLink>
  );
}