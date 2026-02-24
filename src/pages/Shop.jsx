import React, { useState } from 'react';
import { ShoppingCart, Filter, LayoutGrid, List, ChevronDown } from "lucide-react";

// In products ko tum baad mein ek alag file (data.js) mein bhi rakh sakte ho
export const products = [
  {
    id: 1,
    name: "Blue Fantasy Bouquet",
    price: 2399,
    originalPrice: 3500,
    discount: "32%",
    category: "Bouquets",
    color: "Blue",
    image: "https://knotsnco.in/wp-content/uploads/2024/01/IMG_7856-scaled.jpg" // Example image
  },
  {
    id: 2,
    name: "Golden Glow Sunflower",
    price: 899,
    originalPrice: 1450,
    discount: "38%",
    category: "Bouquets",
    color: "Yellow",
    image: "https://knotsnco.in/wp-content/uploads/2023/12/IMG_7145-scaled.jpg"
  },
  {
    id: 3,
    name: "Evil Eye Bag",
    price: 2799,
    originalPrice: 3599,
    discount: "23%",
    category: "Bags",
    color: "Blue",
    image: "https://knotsnco.in/wp-content/uploads/2023/11/IMG_5642-scaled.jpg"
  },
  {
    id: 4,
    name: "Pink Ruffle Bag",
    price: 1799,
    originalPrice: 2600,
    discount: "31%",
    category: "Bags",
    color: "Pink",
    image: "https://knotsnco.in/wp-content/uploads/2024/02/IMG_8823-scaled.jpg"
  },
  // Aur products yahan add kar sakte ho...
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState(9800);

  return (
    <div className="bg-[#fdfbf7] min-h-screen">
      {/* --- BREADCRUMBS & TITLE --- */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Home &gt; Shop</p>
        <h1 className="text-5xl font-black text-[#4A3434] mb-8">Shop</h1>
        
        {/* Category Pills (Mobile Scrollable) */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {["Accessories", "Bags", "Blankets", "Bouquets", "Home Decor", "Plushies"].map((cat) => (
            <button key={cat} className="px-5 py-2 rounded-xl bg-white border border-gray-100 text-[11px] font-bold uppercase tracking-wider text-[#4A3434] hover:border-[#FFB1B1] transition-all whitespace-nowrap shadow-sm">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 flex flex-col lg:flex-row gap-12">
        
        {/* --- SIDEBAR FILTERS (Desktop Only) --- */}
        <aside className="hidden lg:block w-64 space-y-10">
          {/* Color Filter */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#4A3434] mb-5 border-b pb-2">Filter by Color</h4>
            <div className="space-y-3">
              {["Beige", "Blue", "Yellow", "Pink"].map((color) => (
                <label key={color} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-[#FFB1B1]" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-[#FFB1B1]">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#4A3434] mb-5 border-b pb-2">Filter by Price</h4>
            <input 
              type="range" 
              min="90" 
              max="9800" 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A3434]" 
            />
            <div className="flex justify-between mt-4 text-[11px] font-bold text-gray-500">
              <span>₹90</span>
              <span>₹{priceRange}</span>
            </div>
            <button className="w-full mt-6 bg-[#4A3434] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#FFB1B1] transition-colors">
              Filter Now
            </button>
          </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing 1–16 of 148 results</p>
            <div className="flex items-center gap-4">
              <select className="bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none border-none cursor-pointer text-[#4A3434]">
                <option>Sort by latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="hidden sm:flex gap-2 border-l pl-4 border-gray-100">
                <LayoutGrid size={16} className="text-[#4A3434] cursor-pointer" />
                <List size={16} className="text-gray-300 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-[#FFB1B1]/10 transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-5 left-5 bg-[#2B5BA9] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                    {product.discount} OFF
                  </div>
                  
                  {/* Quick Add Button */}
                  <button className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl translate-y-20 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#FFB1B1] hover:text-white">
                    <ShoppingCart size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 text-center">
                  <p className="text-[9px] font-black text-[#FFB1B1] uppercase tracking-[0.2em] mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-[#4A3434] mb-3 group-hover:text-[#2B5BA9] transition-colors">{product.name}</h3>
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-gray-300 line-through text-xs">₹{product.originalPrice}</span>
                    <span className="text-[#2B5BA9] font-black text-xl">₹{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}