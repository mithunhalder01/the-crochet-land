import React from 'react';
import { ShoppingCart, ArrowRight, Star } from "lucide-react";

const discountProducts = {
  featured: {
    id: 1,
    name: "Van Gogh Sunflower Bouquet",
    price: 459,
    oldPrice: 699,
    discount: "35% OFF",
    available: 100,
    sold: 0,
    image: "https://knotsnco.in/cdn/shop/files/Blue_Lagoon.jpg"
  },
  list: [
    { id: 2, name: "Kamal-e-Ishq", price: 1425, oldPrice: 2000, image: "https://knotsnco.in/cdn/shop/files/Tulip_bouquet.jpg" },
    { id: 3, name: "Kamal Pink", price: 750, oldPrice: 999, image: "https://knotsnco.in/cdn/shop/files/Gulabi_Guldasta.jpg" }
  ],
  hot: {
    id: 4,
    name: "Yellow Tulip Bouquet (10)",
    price: 2350,
    oldPrice: 2500,
    image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg"
  }
};

export default function PremiumDiscountSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* Header - Minimal & Bold */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black text-[#4A3434] uppercase tracking-tighter">Super Discounts</h2>
            <p className="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">Limited time deals on our best sellers</p>
          </div>
          <button className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#4A3434] hover:text-[#FFB1B1] transition-all">
            View All Collection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* The Grid - Logic for Mobile (Line by line) and Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. MAIN FEATURED CARD (Large) */}
          <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
              <div className="absolute top-4 left-4 z-10 bg-[#2B5BA9] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                {discountProducts.featured.discount}
              </div>
              <img src={discountProducts.featured.image} alt="Van Gogh" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <div className="flex-grow flex flex-col items-center text-center">
              <h3 className="text-lg font-black text-[#4A3434] uppercase tracking-tight mb-2 line-clamp-1">{discountProducts.featured.name}</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-gray-300 line-through">₹{discountProducts.featured.oldPrice}</span>
                <span className="text-xl font-black text-[#2B5BA9]">₹{discountProducts.featured.price}</span>
              </div>

              {/* Progress Bar with modern styling */}
              <div className="w-full space-y-2 mb-8 px-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter text-gray-400">
                  <span>Available: {discountProducts.featured.available}</span>
                  <span>Sold: {discountProducts.featured.sold}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB1B1] w-[5%] rounded-full shadow-[0_0_10px_rgba(255,177,177,0.5)]"></div>
                </div>
              </div>

              <button className="w-full bg-[#2B5BA9] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#4A3434] transition-all shadow-md active:scale-95">
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>

          {/* 2. MIDDLE LIST (Stacked Cards) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {discountProducts.list.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 flex items-center gap-5 hover:shadow-lg transition-all group flex-1">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-black text-[#4A3434] uppercase tracking-tight mb-1 line-clamp-1">{item.name}</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-gray-300 line-through">₹{item.oldPrice}</span>
                    <span className="text-sm font-black text-[#2B5BA9]">₹{item.price}</span>
                  </div>
                  <button className="w-fit text-[9px] font-black text-[#FFB1B1] uppercase tracking-widest hover:text-[#4A3434] transition-colors border-b-2 border-[#FFB1B1]/20 pb-0.5">
                    Quick Add +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 3. HOT PRODUCT (Elegant Vertical) */}
          <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
              <div className="absolute top-4 right-4 z-10 bg-[#FFB1B1] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                HOT
              </div>
              <img src={discountProducts.hot.image} alt="Hot" className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
            </div>
            
            <div className="mt-auto text-center">
              <h4 className="text-base font-black text-[#4A3434] uppercase tracking-tight mb-2">{discountProducts.hot.name}</h4>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-xs text-gray-300 line-through">₹{discountProducts.hot.oldPrice}</span>
                <span className="text-lg font-black text-[#2B5BA9]">₹{discountProducts.hot.price}</span>
              </div>
              <button className="w-full border-2 border-[#2B5BA9] text-[#2B5BA9] py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#2B5BA9] hover:text-white transition-all duration-300 active:scale-95">
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}