import { useState, useEffect } from "react";
import { ShoppingCart, Star, Filter, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";


const Shop = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(9800);
  const [minPrice, setMinPrice] = useState(90);
  const [sortBy, setSortBy] = useState("latest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        // Adapt backend data to frontend format
        const adapted = data.map(p => ({
          id: p._id,
          name: p.name,
          price: p.price,
          image: p.image,
          category: p.category,
          description: p.description,
          discount: 25, // Derive
          oldPrice: Math.round(p.price * 1.3),
          color: "Mixed" // Default, can add field later
        }));
        setProducts(adapted);
      } catch (error) {
        console.error("Shop fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // --- FILTER LOGIC ---
  const filteredProducts = products

    .filter((p) => {
      // Normalizing categories for better matching
      const catMatch = selectedCategory === "ALL" || p.category.toUpperCase() === selectedCategory.toUpperCase();
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

  const handleAddToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: 1,
    }));
  };

  const increaseQty = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      if (prev[id] === 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return {
        ...prev,
        [id]: prev[id] - 1,
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20 pt-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-4">
          <h1 className="text-3xl font-black text-[#4A3434] tracking-tight">Shop</h1>
          <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Product Categories</p>
        </div>

        {/* CATEGORY CHIPS - Updated with new categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["ALL", "Bouquets", "Flower pots", "Keychains", "Accessories", "Bags", "Blankets"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat.toUpperCase())}
              className={`px-5 py-2.5 rounded-xl text-[11px] font-bold transition-all border ${
                selectedCategory === cat.toUpperCase() 
                ? "bg-[#4A3434] border-[#4A3434] text-white shadow-md" 
                : "bg-white border-gray-100 text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* MOBILE FILTER & SORT BAR (Unchanged) */}
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

        {/* ACTIVE FILTERS (Unchanged) */}
        {(selectedColor || selectedCategory !== "ALL" || maxPrice < 9800) && (
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold text-[#4A3434]">
            <button onClick={clearAllFilters} className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <X size={14} /> Clear filters
            </button>
            {selectedCategory !== "ALL" && (
                <span className="bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm uppercase text-[10px]">
                    {selectedCategory}
                </span>
            )}
            {selectedColor && (
              <button onClick={() => setSelectedColor(null)} className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm uppercase text-[10px]">
                <X size={12} /> {selectedColor}
              </button>
            )}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          {/* DESKTOP SIDEBAR (Unchanged) */}
          <aside className="hidden lg:block lg:w-64 space-y-10">
            <div>
              <h3 className="font-bold text-[#4A3434] text-sm mb-4 border-b pb-2">Filter by Color</h3>
              <div className="space-y-3 text-xs font-bold text-gray-500 uppercase">
                {["BEIGE", "Blue", "Yellow"].map((color) => (
                  <p
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer hover:text-[#4A3434] transition-colors ${selectedColor === color ? 'text-[#4A3434]' : ''}`}
                  >
                    {color}
                  </p>
                ))}
              </div>
            </div>

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
            </div>
          </aside>

          {/* PRODUCT GRID (Unchanged) */}
          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-20 text-gray-400">Loading products...</div>
            ) : filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-50/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full"
                >
                  <Link to={`/product/${product.id}`} className="block p-3 md:p-4">
                    <div className="relative aspect-square overflow-hidden bg-[#FAF9F6] rounded-[1.5rem] md:rounded-[2rem]">
                      <span className="absolute top-3 left-3 z-10 bg-[#4A3434] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {product.discount}% OFF
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </Link>


                  <div className="px-4 pb-5 md:px-6 md:pb-8 text-center flex-1 flex flex-col">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-[#4A3434] text-[12px] md:text-[15px] mb-1.5 uppercase tracking-wide line-clamp-1 hover:text-[#3A56AF] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-center gap-2 mb-5">
                      <span className="text-gray-300 line-through text-[10px] md:text-[12px] font-medium">₹{product.oldPrice}</span>
                      <span className="text-[#3A56AF] text-sm md:text-xl font-black">₹{product.price}</span>
                    </div>

                    <div className="mt-auto space-y-3">
                      {cart[product.id] ? (
                        <div className="flex items-center justify-between bg-[#4A3434] text-white rounded-2xl px-4 py-2.5 shadow-md">
                          <button onClick={() => decreaseQty(product.id)} className="text-xl font-bold px-2">-</button>
                          <span className="font-bold text-sm">{cart[product.id]}</span>
                          <button onClick={() => increaseQty(product.id)} className="text-xl font-bold px-2">+</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="w-full bg-[#4A3434] text-white py-3 md:py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#3A56AF] transition-all font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-sm active:scale-95"
                        >
                          <ShoppingCart size={14} /> Add to cart
                        </button>
                      )}
                      <Link to={`/product/${product.id}`} className="block w-full text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 text-gray-300 font-bold uppercase text-[10px] tracking-[0.2em]">
                No matching products found
              </div>
            )}
          </main>
        </div>
      </div>
      {/* (Mobile Drawer remains unchanged) */}
    </div>
  );
};

export default Shop;