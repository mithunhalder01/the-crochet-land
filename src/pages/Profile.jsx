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
  // Default tab "dashboard" kar diya hai taaki khulte hi khali na dikhe
  const [activeTab, setActiveTab] = useState("dashboard");

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
      
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10">
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-2">
            <span>Home</span> <ChevronRight size={10} /> <span>My account</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight text-center md:text-left">
            My Account
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* SIDEBAR */}
        <aside className="lg:w-64 shrink-0">
          {/* User Info (Mobile par center, Desktop par left) */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6 md:mb-10 px-2 text-center md:text-left">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center font-bold text-[#1A1A1A] border border-gray-100 text-sm">
              {user?.email?.substring(0, 1).toUpperCase() || "M"}
            </div>
            <div className="overflow-hidden">
              <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                Welcome back,
              </p>
              <p className="font-bold text-xs md:text-sm text-[#1A1A1A] truncate max-w-[150px]">
                {user?.email || "mithunhalder.dev@gmail.com"}
              </p>
            </div>
          </div>

          {/* MOBILE MENU (Horizontal Scroll) */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide border-b lg:border-none border-gray-50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex lg:w-full items-center gap-2 lg:gap-3 py-2.5 lg:py-3 px-4 text-[11px] lg:text-[13px] font-bold transition-all rounded-xl whitespace-nowrap ${
                  activeTab === item.id
                    ? "bg-[#1A1A1A] text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]"
                }`}
              >
                <span className={activeTab === item.id ? "text-[#FFB1B1]" : "text-gray-300"}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="flex lg:w-full items-center gap-2 lg:gap-3 py-2.5 lg:py-3 px-4 text-[11px] lg:text-[13px] font-bold text-gray-400 hover:text-red-500 transition-all whitespace-nowrap"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-12 border border-gray-100 shadow-sm min-h-[400px]">
          
          {/* --- DASHBOARD TAB --- */}
          {activeTab === "dashboard" && (
            <div className="animate-in fade-in duration-500 text-sm sm:text-base leading-relaxed text-gray-600">
              <p className="mb-4 text-[#1A1A1A]">
                Hello <span className="font-bold text-[#1A1A1A]">{user?.email || "User"}</span> (not <span className="font-bold text-[#1A1A1A]">{user?.email}</span>? <button onClick={handleLogout} className="text-[#2B5BA9] font-bold hover:underline">Log out</button>)
              </p>
              <p>
                From your account dashboard you can view your <button onClick={() => setActiveTab("orders")} className="text-[#2B5BA9] font-bold hover:underline">recent orders</button>, 
                manage your <button onClick={() => setActiveTab("addresses")} className="text-[#2B5BA9] font-bold hover:underline">shipping and billing addresses</button>, 
                and <button onClick={() => setActiveTab("details")} className="text-[#2B5BA9] font-bold hover:underline">edit your password and account details</button>.
              </p>
            </div>
          )}

          {/* --- ORDERS TAB --- */}
          {activeTab === "orders" && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-gray-200" />
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">No order has been made yet.</p>
              <button onClick={() => navigate('/shop')} className="bg-[#1A1A1A] text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#FFB1B1] transition-all">
                Browse Products
              </button>
            </div>
          )}

          {/* --- DOWNLOADS TAB --- */}
          {activeTab === "downloads" && (
            <div className="py-12 text-center animate-in fade-in">
              <Download size={32} className="mx-auto text-gray-200 mb-4" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No downloads available yet.</p>
            </div>
          )}

          {/* --- ADDRESSES TAB --- */}
          {activeTab === "addresses" && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
               <p className="text-sm text-gray-500 mb-8">The following addresses will be used on the checkout page by default.</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#1A1A1A]">Billing address</h4>
                    <button className="text-[#2B5BA9] text-xs font-bold uppercase underline tracking-wider italic">Add</button>
                    <p className="text-xs text-gray-400 italic">You have not set up this type of address yet.</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-[#1A1A1A]">Shipping address</h4>
                    <button className="text-[#2B5BA9] text-xs font-bold uppercase underline tracking-wider italic">Add</button>
                    <p className="text-xs text-gray-400 italic">You have not set up this type of address yet.</p>
                  </div>
               </div>
            </div>
          )}

          {/* --- ACCOUNT DETAILS TAB --- */}
          {activeTab === "details" && (
            <div className="max-w-3xl animate-in fade-in duration-500">
              <h3 className="text-xl font-black text-[#1A1A1A] mb-8 uppercase tracking-tight">
                Account Details
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">First name *</label>
                    <input className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Last name *</label>
                    <input className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all text-sm font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Display name *</label>
                  <input defaultValue={user?.email} className="w-full p-4 bg-[#F9FAFB] rounded-xl border border-transparent outline-none text-sm font-medium" />
                  <p className="text-[10px] italic text-gray-400 mt-1">This will be how your name will be displayed in the account section and in reviews</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email address *</label>
                  <input type="email" defaultValue={user?.email} disabled className="w-full p-4 bg-[#F3F4F6] text-gray-400 rounded-xl border border-transparent outline-none cursor-not-allowed text-sm font-medium" />
                </div>
                <button type="submit" className="w-full sm:w-auto mt-6 bg-[#1A1A1A] text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FFB1B1] transition-all shadow-md active:scale-95">
                  Save Changes
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;