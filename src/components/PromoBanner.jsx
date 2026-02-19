import React from 'react';
import { Truck, PhoneCall, RotateCcw, BadgePercent, ArrowRight } from "lucide-react";

export default function CompactTrustSection() {
  return (
    <section className="bg-white py-10 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- 1. COMPACT FEATURES GRID --- */}
        {/* Mobile: 2x2 Grid | Desktop: 4 Columns in a line */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 mb-12 md:mb-16">
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 text-[#FFB1B1]">
              <Truck size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-[11px] font-black text-[#4A3434] uppercase tracking-widest mb-1">Fast Delivery</h4>
            <p className="text-[9px] text-gray-400 font-medium px-2">Across India</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-3 text-[#FFB1B1]">
              <PhoneCall size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-[11px] font-black text-[#4A3434] uppercase tracking-widest mb-1">24/7 Support</h4>
            <p className="text-[9px] text-gray-400 font-medium px-2">Always Online</p>
          </div>

          <div className="flex flex-col items-center text-center border-t border-gray-50 pt-10 md:pt-0 md:border-t-0">
            <div className="mb-3 text-[#FFB1B1]">
              <RotateCcw size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-[11px] font-black text-[#4A3434] uppercase tracking-widest mb-1">Easy Return</h4>
            <p className="text-[9px] text-gray-400 font-medium px-2">7 Days Policy</p>
          </div>

          <div className="flex flex-col items-center text-center border-t border-gray-50 pt-10 md:pt-0 md:border-t-0">
            <div className="mb-3 text-[#FFB1B1]">
              <BadgePercent size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-[11px] font-black text-[#4A3434] uppercase tracking-widest mb-1">Discounts</h4>
            <p className="text-[9px] text-gray-400 font-medium px-2">On ₹5000+ orders</p>
          </div>

        </div>

        {/* --- 2. MINIMAL PROMO BAR --- */}
        <div className="bg-[#D2D9E8] rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
          
          <div className="z-10 text-center sm:text-left">
            <h2 className="text-sm md:text-lg font-black text-[#2B5BA9] uppercase tracking-tight mb-2">
              Get <span className="underline decoration-wavy underline-offset-4">10% OFF</span> on your first order
            </h2>
            <div className="inline-flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-xl border border-white">
              <span className="text-[10px] font-black text-[#2B5BA9] tracking-widest">WELCOME10</span>
            </div>
          </div>

          <button className="z-10 bg-[#2B5BA9] text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-[#4A3434] transition-all active:scale-95 shadow-lg shadow-blue-200/50">
            Shop Now <ArrowRight size={14} />
          </button>

          {/* Abstract background shape for premium look */}
          <div className="absolute right-[-5%] top-[-50%] w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        </div>

      </div>
    </section>
  );
}