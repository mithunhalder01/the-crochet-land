import React from 'react';
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function MinimalCTA() {
  return (
    <section className="bg-white py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Card: Text Focused */}
        <div className="relative overflow-hidden bg-[#D2D9E8] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:shadow-xl">
          
          {/* Left: Heading & Subtext */}
          <div className="space-y-4 md:max-w-md">
            <div className="inline-flex items-center px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full mx-auto md:mx-0">
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#2B5BA9]">
                Handmade Excellence
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-[#4A3434] leading-[1.1] tracking-tighter uppercase">
              Ready to bring <br />
              <span className="text-[#2B5BA9]">Magic home?</span>
            </h2>
            
            <p className="text-sm md:text-base text-[#4A3434]/70 font-medium">
              Join our community of crochet lovers. Every piece is made to last a lifetime.
            </p>
          </div>

          {/* Right: Big Minimal Button */}
          <div className="w-full md:w-auto">
            <button className="group w-full md:w-auto flex items-center justify-center gap-4 bg-[#2B5BA9] text-white px-10 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-lg shadow-blue-200 transition-all hover:bg-[#4A3434] active:scale-95">
              <span>Shop Now</span>
              <div className="bg-white/20 p-1 rounded-lg transition-transform group-hover:translate-x-1">
                <ArrowRight size={20} />
              </div>
            </button>
          </div>

          {/* Background Decorative Circles (Very Subtle) */}
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-[#2B5BA9]/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}