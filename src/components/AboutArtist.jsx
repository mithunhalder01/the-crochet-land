import React from 'react';
import { Heart, Sparkles, Instagram, ExternalLink } from "lucide-react";

export default function AboutArtist() {
  return (
    <section className="bg-[#FCFAFA] py-16 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* --- LEFT: Artist Image with Soft Aesthetic --- */}
          <div className="relative w-full lg:w-1/2">
            {/* Subtle Gradient Blob behind image */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#FFB1B1]/10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://knotsnco.in/cdn/shop/files/Artist_Working.jpg" // Yahan Tanisha ki photo dalo
                alt="Tanisha - The Artist" 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Signature Badge */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-5 md:p-7 rounded-[2rem] shadow-xl border border-gray-50 z-20">
              <div className="flex items-center gap-4">
                <div className="bg-[#2B5BA9] p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Handcrafted by</p>
                  <p className="text-lg font-black text-[#4A3434] tracking-tight">Tanisha</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Brand Story --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow-sm border border-gray-100">
              <Heart size={14} className="text-[#FFB1B1] fill-[#FFB1B1]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">The Soul of the Brand</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-[#4A3434] leading-[0.9] tracking-tighter uppercase">
                The Hands Behind <br /> 
                <span className="text-[#2B5BA9]">The Crochet Land.</span>
              </h2>
              <div className="w-20 h-1.5 bg-[#FFB1B1] rounded-full"></div>
            </div>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium italic">
              "I believe that in a world of fast-paced machines, there's a unique magic in a slow-made stitch."
            </p>

            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
              At **The Crochet Land**, Tanisha transforms simple yarn into permanent memories. What started as a passion project has grown into a sanctuary for handmade art. Every bouquet and plushie is created with patience, ensuring that you receive more than just a product—you receive a piece of art.
            </p>

            <div className="pt-6 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#4A3434] flex items-center justify-center text-white font-black text-xl shadow-lg">
                  T
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4A3434] uppercase tracking-widest">Tanisha</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Founder & Artist</p>
                </div>
              </div>
              
              <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#2B5BA9] group">
                <Instagram size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="border-b-2 border-transparent group-hover:border-[#2B5BA9] transition-all">Follow the process</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}