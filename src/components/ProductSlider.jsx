import React, { useState, useRef } from 'react';
import { ShoppingCart, Star, ArrowRight } from "lucide-react";

const categories = ["All", "Accessories", "Bags", "Blankets", "Bouquets", "Flower Pots", "Plushies"];

const products = [
  { id: 1, name: "Gulabi Guldasta", price: 1999, oldPrice: 2600, discount: "24%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Gulabi_Guldasta.jpg" },
  { id: 2, name: "Purple Paradise", price: 1689, oldPrice: 1999, discount: "16%", rating: 4, image: "https://knotsnco.in/cdn/shop/files/Purple_paradise.jpg" },
  { id: 3, name: "Blue Lagoon", price: 1175, oldPrice: 1800, discount: "35%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Blue_Lagoon.jpg" },
  { id: 4, name: "Daisy Bouquet", price: 750, oldPrice: 900, discount: "17%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg" },
  { id: 5, name: "Tulip Mix", price: 1200, oldPrice: 1500, discount: "20%", rating: 4, image: "https://knotsnco.in/cdn/shop/files/Tulip_bouquet.jpg" },
  { id: 6, name: "Mini Sunflower", price: 899, oldPrice: 1100, discount: "18%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg" },
  { id: 7, name: "Cute Plushie", price: 450, oldPrice: 600, discount: "25%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Purple_paradise.jpg" },
  { id: 8, name: "Red Rose Trio", price: 2100, oldPrice: 2500, discount: "16%", rating: 4, image: "https://knotsnco.in/cdn/shop/files/Gulabi_Guldasta.jpg" },
  { id: 9, name: "Lavender Pot", price: 1400, oldPrice: 1800, discount: "22%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Blue_Lagoon.jpg" },
  { id: 10, name: "Berry Bouquet", price: 999, oldPrice: 1300, discount: "23%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg" },
  { id: 11, name: "Pastel Dream", price: 1550, oldPrice: 1900, discount: "18%", rating: 5, image: "https://knotsnco.in/cdn/shop/files/Purple_paradise.jpg" },
  { id: 12, name: "Sunny Daisy", price: 650, oldPrice: 850, discount: "23%", rating: 4, image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg" },
];

export default function CompactProductSlider() {
  const [activeTab, setActiveTab] = useState("All");
  const scrollRef = useRef(null);

  return (
    <section className="bg-white py-10 select-none">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* --- 1. MINIMAL CATEGORY FILTER --- */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-tighter transition-all ${
                activeTab === cat 
                ? "bg-[#D1E1F0] text-[#4A3434]" 
                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- 2. COMPACT SLIDER --- */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[160px] md:min-w-[240px] snap-start bg-white border border-gray-100 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <span className="absolute top-2 left-2 z-10 bg-[#2B5BA9] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {product.discount}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Info Section */}
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={8} fill={i < product.rating ? "#FACC15" : "none"} stroke={i < product.rating ? "#FACC15" : "#D1D5DB"} />
                    ))}
                  </div>
                  
                  <h3 className="text-[11px] md:text-[13px] font-bold text-[#4A3434] uppercase tracking-tight text-center line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[10px] text-gray-300 line-through">₹{product.oldPrice}</span>
                    <span className="text-[12px] md:text-sm font-black text-[#2B5BA9]">₹{product.price}</span>
                  </div>

                  {/* Add to Cart - Compact & Bottom */}
                  <button className="w-full mt-auto bg-[#2B5BA9] text-white py-2 rounded text-[9px] font-bold uppercase tracking-widest hover:bg-[#4A3434] transition-colors flex items-center justify-center gap-1.5">
                    <ShoppingCart size={12} /> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. SHOW MORE (Right Aligned) --- */}
        <div className="flex justify-end mt-4">
          <button className="flex items-center gap-1.5 text-[#4A3434] hover:text-[#FFB1B1] text-[11px] font-black uppercase tracking-widest transition-all group">
            View All 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
