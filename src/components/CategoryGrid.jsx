import React from 'react';
// Agar yahan error aaye toh check karo 'lucide-react' installed hai ya nahi
import { ArrowRight } from "lucide-react";

const categories = [
  { id: 1, name: "Bags", count: 6, image: "./bags.png" },
  { id: 2, name: "Plushies", count: 10, image: "./plush.png" },
  { id: 3, name: "Keychain", count: 16, image: "./keychain.png" },
  { id: 4, name: "Bouquets", count: 42, image: "https://knotsnco.in/cdn/shop/files/Bouquets_category.png" },
];

export default function CategoryGrid() {
  // Check if categories[0] exists to prevent "undefined" error
  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Large Card */}
          <div className="md:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-gray-100 hover:shadow-xl transition-all duration-500 group">
            <div className="order-2 md:order-1 text-center md:text-left mt-6 md:mt-0">
              <span className="inline-block px-4 py-1.5 bg-gray-50 text-[#FFB1B1] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                {categories[0].count} Products
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-[#4A3434] uppercase tracking-tighter mb-6">
                {categories[0].name}
              </h2>
              <button className="flex items-center gap-2 text-[#4A3434] font-bold text-xs uppercase tracking-[0.2em] group-hover:text-[#FFB1B1] transition-all">
                View All <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="order-1 md:order-2 transform transition-transform duration-700 group-hover:scale-105">
              <img 
                src={categories[0].image} 
                alt={categories[0].name} 
                className="w-56 md:w-80 h-auto drop-shadow-xl" 
                onError={(e) => e.target.src = 'https://via.placeholder.com/300'} // Image na load hone par placeholder dikhayega
              />
            </div>
          </div>

          {/* Side Cards */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {categories.slice(1).map((cat) => (
              <div key={cat.id} className="bg-white rounded-[1.5rem] p-6 flex items-center justify-between border border-gray-100 hover:shadow-lg transition-all group overflow-hidden">
                <div className="flex-1">
                  <span className="text-[9px] font-bold text-[#FFB1B1] uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                    {cat.count} Products
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[#4A3434] uppercase tracking-tighter mt-2 group-hover:text-[#FFB1B1] transition-colors">
                    {cat.name}
                  </h3>
                </div>
                <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="max-h-full w-auto drop-shadow-md" 
                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}