import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const categories = ["All", "Bouquets", "Flower pots", "Keychains", "Accessories", "Bags", "Blankets"];

export default function CompactProductSlider({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const adapted = data.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.image,
          category: p.category,
          discount: 25,
          oldPrice: Math.round(p.price * 1.3)
        }));
        setProducts(adapted);
      } catch (error) {
        console.error("Slider fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const filteredProducts = products.filter((p) => {
    if (activeTab === "ALL") return true;
    return p.category.toUpperCase() === activeTab.toUpperCase();
  });


  const handleAddToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const increaseQty = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      if (prev[id] === 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  return (
    <section className="bg-white py-6 md:py-10 select-none overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* --- 1. CATEGORY FILTER (Mobile Friendly) --- */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:justify-center md:mx-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat.toUpperCase())}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold transition-all border whitespace-nowrap ${
                activeTab === cat.toUpperCase() 
                ? "bg-[#4A3434] border-[#4A3434] text-white shadow-md" 
                : "bg-white border-gray-100 text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- 2. PRODUCT SLIDER (Mobile Responsive) --- */}
        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
          >
            {loading ? (
              Array(4).fill().map((_, i) => (
                <div key={i} className="min-w-[75%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] snap-start bg-gray-100 rounded-[2rem] animate-pulse h-64"></div>
              ))
            ) : filteredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-[75%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] snap-start bg-white rounded-[2rem] border border-gray-50/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >

                {/* Image Section */}
                <Link to={`/product/${product.id}`} className="block p-3">
                  <div className="relative aspect-square overflow-hidden bg-[#FAF9F6] rounded-[1.5rem]">
                    <span className="absolute top-2 left-2 z-10 bg-[#4A3434] text-white text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount}% OFF
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </Link>

                {/* Content Section */}
                <div className="px-4 pb-5 text-center flex-1 flex flex-col">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#4A3434] text-[12px] md:text-[14px] mb-1.5 uppercase tracking-wide line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-gray-300 line-through text-[9px] md:text-[11px]">₹{product.oldPrice}</span>
                    <span className="text-[#3A56AF] text-sm md:text-lg font-black">₹{product.price}</span>
                  </div>

                  {/* Button Logic */}
                  <div className="mt-auto space-y-2">
                    {cart[product.id] ? (
                      <div className="flex items-center justify-between bg-[#4A3434] text-white rounded-xl px-3 py-2 shadow-md">
                        <button onClick={() => decreaseQty(product.id)} className="text-lg font-bold px-1 active:scale-90">-</button>
                        <span className="font-bold text-xs">{cart[product.id]}</span>
                        <button onClick={() => increaseQty(product.id)} className="text-lg font-bold px-1 active:scale-90">+</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full bg-[#4A3434] text-white py-2.5 md:py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#3A56AF] transition-all font-bold text-[9px] md:text-[10px] uppercase tracking-widest active:scale-95 shadow-sm"
                      >
                        <ShoppingCart size={14} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. VIEW ALL --- */}
        <div className="flex justify-between items-center mt-2 px-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {filteredProducts.length} Products Found
          </p>
          <Link to="/shop" className="flex items-center gap-1 text-[#4A3434] hover:text-[#3A56AF] text-[10px] font-black uppercase tracking-widest transition-all group">
            Shop All 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}