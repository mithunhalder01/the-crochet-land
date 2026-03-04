import React, { useState } from 'react';
import { Home, Search, User, Store } from 'lucide-react'; // Store icon import kiya
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ setIsSidebarOpen }) => {

  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      {/* --- MOBILE SEARCH OVERLAY --- */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[120] transition-all duration-300 md:hidden ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className={`w-full bg-white p-4 shadow-xl transition-transform duration-300 ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-[#4A3434]">
              <Search size={22} strokeWidth={1.8} />
            </button>
            <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
              <input
                autoFocus={isSearchOpen}
                type="text"
                placeholder="Search for products..."
                className="w-full bg-transparent outline-none text-[#4A3434] text-sm"
              />
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="h-full w-full" onClick={() => setIsSearchOpen(false)} />
      </div>

      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[100]">
      <div className="
        bg-white/70 
        backdrop-blur-lg 
        border border-white/40 
        rounded-[2rem] 
        px-8 py-3 
        shadow-[0_8px_32px_0_rgba(74,52,52,0.15)] 
        max-w-md mx-auto
      ">
        <div className="flex justify-between items-center">
          
          {/* Home / Store */}
          <div 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition-all active:scale-90"
          >
            <Home size={22} strokeWidth={1.8} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
          </div>

          {/* Search */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition-all active:scale-90"
          >
            <Search size={22} strokeWidth={1.8} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Search</span>
          </div>

          {/* Account */}
          <div 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition-all active:scale-90"
          >
            <User size={22} strokeWidth={1.8} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Account</span>
          </div>

          {/* Shop (Menu ki jagah replace kiya) */}
          <div 
            onClick={() => navigate('/shop')}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition-all active:scale-90"
          >
            <Store size={22} strokeWidth={1.8} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Shop</span>
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default BottomNav;
