import React from 'react';
import { Instagram, Heart, Star } from "lucide-react";

const gallery = [
  { id: 1, img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=400", size: "h-64" },
  { id: 2, img: "https://images.unsplash.com/photo-1484981138541-3d074aa97716?q=80&w=400", size: "h-80" },
  { id: 3, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400", size: "h-72" },
  { id: 4, img: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=400", size: "h-96" },
  { id: 5, img: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=400", size: "h-64" },
  { id: 6, img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=400", size: "h-80" },
  { id: 7, img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400", size: "h-72" },
  { id: 8, img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400", size: "h-64" },
];

export default function HappyCustomers() {
  return (
    <section className="bg-[#FCFAFA] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header: Phooldhaage Style --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-[#FFB1B1]"></span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFB1B1]">Happy Customer</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#4A3434] uppercase tracking-tighter leading-none">
              Spreading Smiles <br />
              <span className="text-[#2B5BA9]">@TheCrochetLand</span>
            </h2>
          </div>
          
          <button className="bg-white text-[#4A3434] border border-gray-100 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-[#4A3434] hover:text-white transition-all shadow-sm">
            <Instagram size={16} /> Follow on Instagram
          </button>
        </div>

        {/* --- Masonry-ish Gallery Grid --- */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden rounded-[2rem] bg-gray-100 break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-[#2B5BA9]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center text-white p-4">
                <Heart className="fill-white mb-2" size={24} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-center">Loved by our customer</p>
              </div>

              {/* Instagram Story Like Tag */}
              <div className="absolute top-4 right-4 z-20">
                 <div className="bg-white/80 backdrop-blur-md p-2 rounded-xl">
                    <Star size={12} className="fill-[#FFB1B1] text-[#FFB1B1]" />
                 </div>
              </div>

              <img 
                src={item.img} 
                alt="Happy Customer" 
                className={`w-full ${item.size} object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out`}
              />
            </div>
          ))}
        </div>

        {/* --- Bottom Trust Bar --- */}
        <div className="mt-16 bg-white p-8 rounded-[3rem] border border-gray-50 flex flex-wrap justify-around items-center gap-8 shadow-sm">
           <div className="text-center">
              <p className="text-lg font-black text-[#4A3434]">5k+</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Delivered</p>
           </div>
           <div className="text-center border-x border-gray-100">
              <p className="text-lg font-black text-[#4A3434]">4.9</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Rating</p>
           </div>
           <div className="text-center">
              <p className="text-lg font-black text-[#4A3434]">100%</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter">Handmade</p>
           </div>
        </div>
        

      </div>
    </section>
  );
}