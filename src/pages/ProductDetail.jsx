import { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data/products";
import { 
  Star, ShoppingCart, Share2, 
  Facebook, Twitter, Instagram, MessageCircle, Minus, Plus, Maximize2 
} from "lucide-react";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // FIX: ID ko string aur number dono tarah se check kar rahe hain taaki "Not Found" na aaye
  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );
  
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const handleAddToCart = () => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + qty }));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex flex-col items-center justify-center font-bold text-[#4A3434]">
        <h1 className="text-2xl mb-4">Product Not Found</h1>
        <button 
          onClick={() => navigate("/shop")}
          className="bg-[#4A3434] text-white px-6 py-2 rounded-full uppercase text-xs tracking-widest"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] bg-[url('https://knotsnco.in/wp-content/uploads/2026/01/download.png')] bg-repeat">
      
      {/* BREADCRUMBS - Screenshot 8 style */}
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#FFB1B1]">Home</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-[#FFB1B1]">{product.category}</Link>
          <span>›</span>
          <span className="text-gray-400/60">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: IMAGE SECTION - Screenshot 10 style */}
          <div className="relative group">
             <div className="relative bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm">
                <span className="absolute top-4 left-4 z-10 bg-[#3A56AF] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {product.discount}%
                </span>
                <button className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-gray-400 hover:text-[#3A56AF] transition-colors shadow-sm">
                  <Maximize2 size={18} />
                </button>
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full aspect-[4/5] md:aspect-square object-cover" 
                />
             </div>
             
             {/* THUMBNAILS */}
             {product.images?.length > 1 && (
               <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                 {product.images.map((img, idx) => (
                   <img 
                     key={idx} src={img} 
                     onClick={() => setSelectedImage(img)}
                     className={`w-20 h-20 object-cover cursor-pointer border-2 transition-all ${selectedImage === img ? 'border-[#3A56AF]' : 'border-transparent'}`} 
                   />
                 ))}
               </div>
             )}
          </div>

          {/* RIGHT: INFO SECTION - Screenshot 10 style */}
          <div className="flex flex-col py-2">
            <h1 className="text-2xl md:text-4xl font-bold text-[#4A3434] mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-300 line-through text-lg">₹{product.oldPrice}</span>
              <span className="text-3xl font-bold text-[#3A56AF]">₹{product.price}</span>
            </div>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-green-600 uppercase bg-green-50 px-2 py-1 rounded">In Stock</span>
            </div>

            {/* PINK CART NOTICE - Screenshot 10 exact style */}
            <div className="bg-[#FFF5F5] border border-[#FFB1B1]/20 p-4 rounded-sm flex items-center gap-3 mb-8 shadow-sm">
               <ShoppingCart size={18} className="text-[#FFB1B1]" />
               <p className="text-[12px] font-medium text-[#4A3434]">
                 This product has been added to <span className="font-bold">2 people's</span> carts.
               </p>
            </div>

            {/* QTY & ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center border border-gray-200 bg-white h-11 rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 text-gray-400 hover:text-[#4A3434]"><Minus size={16}/></button>
                <span className="px-4 font-bold text-[#4A3434] border-x border-gray-100 min-w-[45px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 text-gray-400 hover:text-[#4A3434]"><Plus size={16}/></button>
              </div>
              
              <button 
                onClick={handleAddToCart} 
                className="bg-[#3A56AF] text-white font-bold h-11 px-8 rounded-sm text-xs uppercase tracking-widest hover:bg-[#2e458e] shadow-md transition-all active:scale-95"
              >
                Add to cart
              </button>
              
              <button className="bg-[#3A56AF] text-white font-bold h-11 px-8 rounded-sm text-xs uppercase tracking-widest hover:bg-[#2e458e] shadow-md transition-all">
                Buy Now
              </button>
            </div>

            {/* DESCRIPTION & METADATA */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#4A3434]">Description</h3>
                <Plus size={14} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {product.description || "Handcrafted with premium yarn, this unique piece captures the beauty of crochet artistry. Perfect for gifting and home decor."}
              </p>
              
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-6">
                Category: <span className="text-[#4A3434] font-black">{product.category}</span>
              </p>
              
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, MessageCircle].map((Icon, i) => (
                  <button key={i} className="text-gray-400 hover:text-[#3A56AF] transition-colors">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION - Screenshot 11 style */}
        <div className="mt-24 border-t border-gray-100 pt-12">
           <h2 className="text-xl font-bold text-[#4A3434] mb-8">Reviews</h2>
           <p className="text-sm text-gray-500 mb-8 italic">There are no reviews yet.</p>
           
           <div className="max-w-3xl bg-white/30 p-6 rounded-lg border border-white/50">
              <h3 className="text-md font-bold text-[#4A3434] mb-2">Be the first to review "{product.name}"</h3>
              <p className="text-[11px] text-gray-400 uppercase font-bold mb-4 tracking-wider">Your rating *</p>
              <div className="flex gap-1 mb-6 text-gray-200">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="cursor-pointer hover:text-yellow-400 transition-colors" />)}
              </div>
              
              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Your review *</label>
              <textarea className="w-full h-36 p-4 border border-gray-200 outline-none focus:border-[#3A56AF] bg-white/80 rounded-sm mb-6 transition-all"></textarea>
              
              <button className="bg-[#3A56AF] text-white font-bold px-12 py-3 rounded-sm text-[11px] uppercase tracking-[0.2em] shadow-lg hover:bg-[#2e458e]">
                Submit
              </button>
           </div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR (Desktop & Mobile) - Screenshot 11 exact style */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 py-3 px-4 md:px-10 flex items-center justify-between z-[100] shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-4">
           <div className="hidden sm:block">
              <p className="text-[11px] font-bold text-[#4A3434] uppercase tracking-wider">{product.name}</p>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-gray-300 line-through text-xs">₹{product.oldPrice}</span>
              <span className="text-lg font-bold text-[#3A56AF]">₹{product.price}</span>
           </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-sm h-9">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 text-gray-400"><Minus size={14}/></button>
                <span className="px-3 font-bold text-sm text-[#4A3434]">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-2 text-gray-400"><Plus size={14}/></button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="bg-[#3A56AF] text-white text-[11px] font-bold uppercase px-6 py-2.5 rounded-sm shadow-md active:scale-95 transition-all"
            >
              Add to cart
            </button>
            <button className="hidden sm:block bg-[#3A56AF] text-white text-[11px] font-bold uppercase px-6 py-2.5 rounded-sm shadow-md">
              Buy Now
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;