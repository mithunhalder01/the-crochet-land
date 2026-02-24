import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import {
  Menu, Search, User, ShoppingCart, ChevronDown, Phone, X,
  Mail, Instagram, Facebook, Twitter, MessageCircle, ArrowLeft
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search state
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  
  

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      
      {/* --- SIDEBAR OVERLAY --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- MOBILE SEARCH OVERLAY (Adds Blur & Expansion) --- */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-md z-[80] transition-all duration-300 md:hidden ${isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className={`w-full bg-white p-4 shadow-xl transition-transform duration-300 ${isSearchOpen ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSearchOpen(false)} className="p-2 text-[#4A3434]">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
              <input 
                autoFocus={isSearchOpen}
                type="text" 
                placeholder="Search for products..." 
                className="w-full bg-transparent outline-none text-[#4A3434] text-sm"
              />
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
        <div className="h-full w-full" onClick={() => setIsSearchOpen(false)} />
      </div>

      {/* --- SIDEBAR MENU --- */}
      <div className={`fixed top-0 left-0 h-full w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="p-6 flex justify-between items-center border-b border-gray-100">
             <h2 className="text-xl font-bold text-[#4A3434]">The Crochet Land</h2>
             <X size={24} className="cursor-pointer text-gray-400" onClick={() => setIsOpen(false)} />
          </div>

          <div className="p-6">
            <div className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">Browse Categories</p>
              <nav className="flex flex-col gap-4 text-[#4A3434] font-medium">
                <div className="flex justify-between items-center cursor-pointer hover:text-[#FFB1B1] transition">
                  Accessories <ChevronDown size={16}/>
                </div>
                {["Bags", "Blankets", "Bouquets", "VALENTINES COLLECTION", "Flower Pots", "Home Decor", "Plushies", "फूल"].map((item) => (
                  <span key={item} className="cursor-pointer hover:text-[#FFB1B1] transition">{item}</span>
                ))}
              </nav>
            </div>
            <hr className="my-6 border-gray-100" />
            <div className="mb-8">
              <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">Main Menu</p>
              <nav className="flex flex-col gap-4 text-[#4A3434] font-medium">
                {["Home", "Shop", "About Us", "Privacy Policy", "Refund and Returns Policy", "FAQ"].map((item) => (
                  <span key={item} className="cursor-pointer hover:text-[#FFB1B1] transition">{item}</span>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <div className="bg-white px-4 md:px-8 py-4 md:py-6 relative border-b border-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <Menu size={24} className="md:hidden cursor-pointer text-[#4A3434]" onClick={() => setIsOpen(true)} />
            <h1 className="text-lg md:text-2xl font-bold tracking-tight text-[#4A3434]">The Crochet Land</h1>
            <button onClick={() => setIsOpen(true)} className="hidden md:flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-full bg-white text-[#4A3434] hover:border-[#FFB1B1] hover:text-[#FFB1B1] transition-all">
              <Menu size={16} />
              <span className="font-medium text-sm">Menu</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 md:gap-10">
            {/* Mobile Search Icon - Click triggers logic */}
            <Search 
              size={20} 
              className="md:hidden cursor-pointer text-[#4A3434]" 
              onClick={() => setIsSearchOpen(true)} 
            />
            
            <div
              className="flex items-center gap-2 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] transition group"
              onClick={() => {
                if (user) {
                  handleProfileClick();
                } else {
                  navigate("/login");
                }
              }}
            >
              <User size={20} />
              <div className="text-sm hidden md:block">
                <p className="text-gray-400 text-[10px]">
                  {user ? `Hello, ${user.displayName}` : "Sign In"}
                </p>
                <p className="font-bold group-hover:text-[#FFB1B1]">Account</p>
              </div>
            </div>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:block text-xs font-semibold text-[#4A3434] hover:text-[#FFB1B1] transition"
              >
                Logout
              </button>
            )}
            <div className="flex items-center gap-2 cursor-pointer text-[#4A3434] hover:text-[#FFB1B1] relative transition group">
              <ShoppingCart size={20} />
              <div className="text-sm hidden md:block">
                <p className="text-gray-400 text-[10px]">Total</p>
                <p className="font-bold group-hover:text-[#FFB1B1]">₹0.00</p>
              </div>
              <span className="absolute -top-2 left-4 bg-[#FFB1B1] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">0</span>
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop Only (No Design Change) */}
        <div className="hidden md:block md:w-[40%] md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
          <div className="flex items-center w-full bg-gray-50 border border-transparent rounded-full px-5 py-2 shadow-sm focus-within:bg-white focus-within:border-gray-200 transition-all">
            <input type="text" placeholder="Search for products..." className="w-full px-2 py-1 outline-none text-sm bg-transparent text-[#4A3434]" />
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* CATEGORY NAVIGATION */}
      <nav className="bg-white border-b border-gray-100 px-4 md:px-8 py-3 flex md:justify-center gap-6 md:gap-10 text-[#4A3434] font-medium text-[11px] tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide uppercase">
        {["Accessories", "Bags", "Blankets", "Bouquets", "Flower Pots"].map((cat) => (
          <span key={cat} className="hover:text-[#FFB1B1] cursor-pointer transition">{cat}</span>
        ))}
        <span className="hover:text-[#FFB1B1] cursor-pointer text-[#FFB1B1] font-bold">Best Discounts</span>
      </nav>
    </header>
  );
};


export default Navbar;
