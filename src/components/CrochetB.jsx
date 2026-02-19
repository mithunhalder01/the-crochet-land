import React from 'react';
import { ArrowRight } from "lucide-react";

const CrochetBanner = () => {
  const banners = [
    {
      title: "Sunflower POT",
      subtitle: "Only this week. Don't miss...",
      image: "./sunflower.png", // Example URL
      bgColor: "bg-[#D1E1F0]", // Soft Blue like your promo banner
      textColor: "text-[#2B5BA9]",
      btnColor: "bg-[#2B5BA9]"
    },
    {
      title: "Cactus Pot",
      subtitle: "Don't miss the opportunity...",
      image: "./Cucuts_Pots.png", // Example URL
      bgColor: "bg-[#FFB1B1]/20", // Very light soft pink
      textColor: "text-[#4A3434]",
      btnColor: "bg-[#FFB1B1]"
    }
  ];

  return (
    // Background pure light gray (gray-50) for that minimal look
    <div className="w-full bg-gray-50 py-12 px-4 md:px-12 flex flex-col md:flex-row justify-center gap-6">
      {banners.map((item, index) => (
        <div 
          key={index}
          className={`${item.bgColor} relative overflow-hidden rounded-[2.5rem] w-full max-w-xl h-[280px] md:h-[320px] flex items-center p-8 md:p-12 group cursor-pointer border border-white/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
        >
          {/* Text Content */}
          <div className="z-10 w-3/5">
            <span className={`${item.textColor} text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2 block`}>
              Limited Edition
            </span>
            <h2 className={`${item.textColor} text-3xl md:text-4xl font-black mb-4 leading-none tracking-tighter uppercase`}>
              {item.title}
            </h2>
            <p className={`${item.textColor} text-xs opacity-80 mb-8 font-bold max-w-[180px]`}>
              {item.subtitle}
            </p>
            
            <button className={`${item.btnColor} text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all`}>
              Shop Now <ArrowRight size={14} />
            </button>
          </div>

          {/* Image Section - Floating Style */}
          <div className="absolute right-0 bottom-0 h-full w-2/5 flex items-end justify-center">
            <img 
              src={item.image} 
              alt={item.title} 
              className="h-[90%] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ease-out"
            />
          </div>

          {/* Decorative Subtle Circle behind image */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-all duration-700"></div>
        </div>
      ))}
    </div>
  );
};

export default CrochetBanner;