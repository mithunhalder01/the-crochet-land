import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, ShoppingBag, Download, 
  MapPin, UserCircle, LogOut, Eye, ChevronRight
} from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={18} /> },
    { id: "downloads", label: "Downloads", icon: <Download size={18} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={18} /> },
    { id: "details", label: "Account details", icon: <UserCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-[#2D2D2D]">
      
      {/* --- CLEAN HEADER --- */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-2">
            <span>Home</span> <ChevronRight size={10} /> <span>My account</span>
          </div>
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* --- SIDEBAR --- */}
        <aside className="lg:w-64 shrink-0">
          <div className="flex items-center gap-4 mb-10 px-2">
            <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center font-bold text-[#1A1A1A] border border-gray-100">
              {user?.email?.substring(0, 1).toUpperCase() || "M"}
            </div>
            <div className="overflow-hidden">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Welcome back,</p>
              <p className="font-bold text-sm text-[#1A1A1A] truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 py-3 px-4 text-[13px] font-bold transition-all rounded-xl ${
                  activeTab === item.id
                    ? "bg-[#1A1A1A] text-white shadow-lg shadow-gray-200"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]"
                }`}
              >
                <span className={activeTab === item.id ? "text-[#FFB1B1]" : "text-gray-300"}>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-3 px-4 text-[13px] font-bold text-gray-400 hover:text-red-500 transition-all mt-4"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* --- MAIN CONTENT AREA (Hearts Removed) --- */}
        <div className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm relative z-10">
          
          {activeTab === "details" && (
            <div className="max-w-3xl">
              <h3 className="text-xl font-black text-[#1A1A1A] mb-8 uppercase tracking-tight">Account Details</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">First name *</label>
                    <input type="text" className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Last name *</label>
                    <input type="text" className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Display name *</label>
                  <input type="text" defaultValue={user?.email} className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent outline-none text-sm font-medium" />
                  <p className="text-[10px] italic text-gray-400 mt-1">This is how your name will appear in reviews and account sections.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Email address *</label>
                  <input type="email" defaultValue={user?.email} disabled className="w-full p-4 bg-[#F3F4F6] text-gray-400 rounded-xl border border-transparent outline-none cursor-not-allowed text-sm font-medium" />
                </div>

                {/* Password Change */}
                <div className="pt-10 mt-10 border-t border-gray-50">
                  <h4 className="text-lg font-black text-[#1A1A1A] mb-6 uppercase tracking-tight">Password Change</h4>
                  
                  <div className="space-y-5">
                    {["Current password", "New password", "Confirm new password"].map((label, idx) => (
                      <div key={idx} className="space-y-2 relative">
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">{label}</label>
                        <div className="relative">
                          <input type="password" placeholder="••••••••" className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all pr-12 text-sm" />
                          <Eye size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="mt-8 bg-[#1A1A1A] text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FFB1B1] transition-all shadow-md active:scale-95">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Other Tabs Placeholder */}
          {activeTab === "dashboard" && (
            <div className="text-sm leading-relaxed text-[#4B5563]">
              <p className="mb-4 text-base">Hello <span className="font-bold text-[#1A1A1A]">{user?.email}</span></p>
              <p>Welcome to your personal space. From here, you can easily manage your orders, shipping addresses, and account security.</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="py-20 text-center">
              <ShoppingBag size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No orders found yet.</p>
              <button onClick={() => navigate('/shop')} className="mt-4 text-[#2B5BA9] text-xs font-black uppercase underline tracking-widest">Go to Store</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;