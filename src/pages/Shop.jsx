import { useState, useEffect } from "react";
import { ShoppingCart, Star, Filter, X, ChevronDown } from "lucide-react";

const productsData = [
  { id: 1, name: "GULABI GULDASTA", category: "BOUQUETS", color: "Pink", price: 1999, oldPrice: 2600, discount: 24, image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800" },
  { id: 2, name: "BLUE FANTASY", category: "BAGS", color: "Blue", price: 2399, oldPrice: 3500, discount: 32, image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=800" },
  { id: 3, name: "GOLDEN GLOW", category: "BOUQUETS", color: "Yellow", price: 899, oldPrice: 1450, discount: 38, image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800" },
  { id: 4, name: "EVIL EYE BAG", category: "BAGS", color: "Blue", price: 2799, oldPrice: 3599, discount: 23, image: "https://images.unsplash.com/photo-1544816153-12ad5d713291?w=800" },
  { id: 5, name: "OCTOPUS KEYCHAIN", category: "KEYCHAIN", color: "Blue", price: 220, oldPrice: 400, discount: 45, image: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=800" },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(9800);
  const [minPrice, setMinPrice] = useState(90);
  const [sortBy, setSortBy] = useState("latest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- FILTER LOGIC ---
  const filteredProducts = productsData
    .filter((p) => {
      const catMatch = selectedCategory === "ALL" || p.category === selectedCategory.toUpperCase();
      const colorMatch = !selectedColor || p.color.toUpperCase() === selectedColor.toUpperCase();
      const priceMatch = p.price >= minPrice && p.price <= maxPrice;
      return catMatch && colorMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      return b.id - a.id;
    });

  const clearAllFilters = () => {
    setSelectedCategory("ALL");
    setSelectedColor(null);
    setMaxPrice(9800);
    setMinPrice(90);
  };

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "unset";
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-4">
          <h1 className="text-3xl font-black text-[#4A3434] tracking-tight">Shop</h1>
          <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Product Categories</p>
        </div>

        {/* CATEGORY CHIPS (Desktop & Mobile) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["ALL", "Accessories", "Bags", "Blankets", "Bouquets", "Keychain"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toUpperCase())}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${selectedCategory === cat.toUpperCase() ? "bg-white border-[#4A3434] text-[#4A3434] shadow-sm" : "bg-white border-gray-100 text-gray-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MOBILE FILTER & SORT BAR */}
        <div className="flex items-center justify-between mb-6 md:hidden border-y border-gray-100 py-3">
          <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 font-bold text-[#4A3434] text-sm">
            <Filter size={18} /> Filter
          </button>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent font-bold text-[#4A3434] text-sm outline-none">
              <option value="latest">Sort by latest</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTERS (SCREENSHOT STYLE) */}
        {(selectedColor || selectedCategory !== "ALL" || maxPrice < 9800) && (
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold text-[#4A3434]">
            <button onClick={clearAllFilters} className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <X size={14} /> Clear filters
            </button>
            {selectedColor && (
              <button onClick={() => setSelectedColor(null)} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm uppercase text-[10px]">
                <X size={12} /> {selectedColor}
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block lg:w-64 space-y-10">
            {/* Color Filter */}
            <div>
              <h3 className="font-bold text-[#4A3434] text-sm mb-4 border-b pb-2">Filter by Color</h3>
              <div className="space-y-3 text-xs font-bold text-gray-500 uppercase">
                {["BEIGE", "Blue", "Yellow"].map((color) => (
                  <p
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer hover:text-[#4A3434] transition-colors ${selectedColor === color ? 'text-[#4A3434]' : ''}`}
                  >
                    {color} (1)
                  </p>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-bold text-[#4A3434] text-sm mb-4 border-b pb-2">Filter by price</h3>
              <div className="flex gap-2 mb-4">
                <input type="number" value={minPrice} readOnly className="w-full bg-gray-50 p-2 rounded-lg text-xs font-bold border-none outline-none" />
                <input type="number" value={maxPrice} readOnly className="w-full bg-gray-50 p-2 rounded-lg text-xs font-bold border-none outline-none" />
              </div>
              <input
                type="range" min="90" max="9800" step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-[#4A3434] cursor-pointer"
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Price: ₹{minPrice} — ₹{maxPrice}</p>
                <button className="bg-gray-100 px-4 py-1 rounded text-[10px] font-black uppercase hover:bg-gray-200 transition-colors">Filter</button>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          {/* PRODUCT GRID */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">

                  {/* Image Section */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-2">
                    <span className="absolute top-3 left-3 z-10 bg-[#4A3434] text-white text-[8px] md:text-[10px] font-black px-2 py-1 rounded-lg">
                      {product.discount}% OFF
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-[1rem] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-3 md:p-4 text-center flex-1 flex flex-col">
                    <h3 className="font-bold text-[#4A3434] text-[11px] md:text-sm mb-1 uppercase tracking-tight line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <span className="text-gray-300 line-through text-[10px] font-medium tracking-tighter">₹{product.oldPrice}.00</span>
                      <span className="text-[#4A3434] text-sm md:text-lg font-black tracking-tight">₹{product.price}.00</span>
                    </div>

                    {/* Buttons Group */}
                    <div className="mt-auto flex flex-col gap-2">
                      <button className="w-full bg-[#4A3434] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#FFB1B1] hover:text-[#4A3434] transition-all font-bold text-[10px] uppercase tracking-widest active:scale-95 shadow-md">
                        <ShoppingCart size={14} /> Add to Cart
                      </button>

                      <button className="w-full py-2 rounded-xl text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] hover:text-[#4A3434] transition-colors active:scale-95">
                        View Product
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-gray-400 font-bold uppercase text-xs tracking-widest">
                No matching products found
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER (SCREENSHOT MATCHED) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-xl font-black text-[#4A3434] uppercase tracking-tighter">Filter Products</h2>
              <X onClick={() => setIsFilterOpen(false)} size={24} className="text-gray-400 cursor-pointer" />
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-xs font-black text-[#4A3434] mb-4 uppercase tracking-widest">Filter by Color</h3>
                <div className="space-y-4 text-sm font-bold text-gray-400 uppercase">
                  {["BEIGE", "Blue", "Yellow"].map(color => (
                    <p key={color} onClick={() => { setSelectedColor(color); setIsFilterOpen(false); }} className={`cursor-pointer ${selectedColor === color ? 'text-[#4A3434]' : ''}`}>{color} (1)</p>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black text-[#4A3434] mb-4 uppercase tracking-widest">Filter by price</h3>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Min price</p>
                    <input type="number" value={minPrice} readOnly className="w-full bg-gray-50 p-3 rounded-lg font-bold border-none outline-none" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Max price</p>
                    <input type="number" value={maxPrice} readOnly className="w-full bg-gray-50 p-3 rounded-lg font-bold border-none outline-none" />
                  </div>
                </div>
                <input
                  type="range" min="90" max="9800" step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#4A3434]"
                />
                <p className="mt-4 text-[11px] font-bold text-gray-400">Price: ₹{minPrice} — ₹{maxPrice}</p>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-[#4A3434] text-white py-4 rounded-xl mt-8 font-black uppercase text-xs tracking-widest shadow-xl active:scale-95"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;