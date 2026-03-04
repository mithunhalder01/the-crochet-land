import { useAuth } from "../../context/useAuth";
import { LogOut, Bell, Search, UserCircle } from "lucide-react";

export default function AdminNavbar() {
  const { logout, user } = useAuth();

  return (
    <header className="
      sticky top-6 
      z-40 
      mx-6 
      mt-6 
      h-20 
      bg-white/80 
      backdrop-blur-md 
      border border-slate-100 
      rounded-[24px] 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
      flex items-center justify-between 
      px-8
    ">
      {/* Left: Title & Search Bar */}
      <div className="flex items-center gap-8 flex-1">
        <h1 className="text-xl font-bold text-slate-800 hidden md:block">
          Dashboard
        </h1>
        
        {/* Minimal Search Bar */}
        <div className="relative w-full max-w-md hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-100 transition-all outline-none text-slate-600"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-100 mx-2 hidden sm:block"></div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.email?.split('@')[0] || "Admin User"}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Super Admin
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
             <UserCircle size={24} />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="
            ml-2
            flex items-center gap-2 
            bg-slate-900 text-white 
            px-5 py-2.5 
            rounded-xl 
            text-sm font-medium
            hover:bg-indigo-600 
            transition-all duration-300 
            shadow-lg shadow-indigo-100
          "
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}