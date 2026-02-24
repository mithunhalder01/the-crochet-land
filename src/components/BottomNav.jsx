import React from 'react';
import { Home, Search, User, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BottomNav = ({ setIsSidebarOpen }) => {

  const navigate = useNavigate();

  return (
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
            <span className="text-[9px] font-bold uppercase tracking-widest">Store</span>
          </div>

          {/* Search */}
          <div 
            onClick={() => navigate('/search')}
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

          {/* Categories */}
          <div 
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col items-center gap-1 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition-all active:scale-90"
          >
            <LayoutGrid size={22} strokeWidth={1.8} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Menu</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BottomNav;