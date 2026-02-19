import React from 'react';
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "XL Sunflower POT 🌻",
    price: 710,
    oldPrice: 929,
    discount: "24%",
    image: "https://knotsnco.in/cdn/shop/files/Sunflower_Pot.png"
  },
  {
    id: 2,
    name: "Yellow Rainforest",
    price: 1850,
    oldPrice: 2100,
    discount: "HOT",
    image: "https://knotsnco.in/cdn/shop/files/Daisy_bouquet.jpg"
  },
  {
    id: 3,
    name: "Gulab-e-ishq",
    price: 1700,
    oldPrice: 2000,
    discount: "15%",
    image: "https://knotsnco.in/cdn/shop/files/Gulabi_Guldasta.jpg"
  },
  {
    id: 4,
    name: "Kamal-e-Ishq",
    price: 1425,
    oldPrice: 2000,
    discount: "NEW",
    image: "https://knotsnco.in/cdn/shop/files/Tulip_bouquet.jpg"
  }
];

export default function MinimalArrivalsAlwaysShow() {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header - Simple & Clean */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl md:text-2xl font-black text-[#4A3434] uppercase tracking-tighter">
            New Arrivals
          </h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FFB1B1] flex items-center gap-1 transition-colors">
            See All <ArrowRight size={12} />
          </button>
        </div>

        {/* Grid - 2 columns mobile, 4 columns desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col group">
              
              {/* Product Image Box */}
              <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#F9F9F9] border border-gray-100 mb-3 transition-shadow hover:shadow-md">
                
                {/* Minimalist Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-[#2B5BA9] text-white text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {product.discount}
                  </span>
                </div>

                {/* Wishlist Icon */}
                <button className="absolute top-2 right-2 z-10 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-[#4A3434] hover:text-[#FFB1B1] transition-colors">
                  <Heart size={14} />
                </button>

                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info & Static Button */}
              <div className="px-1">
                <h3 className="text-[11px] md:text-sm font-bold text-[#4A3434] truncate mb-1 text-center lg:text-left">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="text-[9px] md:text-[10px] text-gray-300 line-through">₹{product.oldPrice}</span>
                  <span className="text-xs md:text-sm font-black text-[#2B5BA9]">₹{product.price}</span>
                </div>

                {/* Always Visible Add to Cart Button */}
                <button className="w-full bg-[#2B5BA9] text-white py-2.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#4A3434] transition-all shadow-sm active:scale-95">
                  <ShoppingCart size={12} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}