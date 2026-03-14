import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Star, ShoppingCart, Share2, 
  Facebook, Twitter, Instagram, MessageCircle, Minus, Plus, Maximize2 
} from "lucide-react";

const ProductDetail = ({ setCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        // Adapt
        const adapted = {
          ...data,
          id: data._id,
          images: [data.image], // Single image for now
          oldPrice: Math.round(data.price * 1.3),
          discount: 25,
          description: data.description || 'Handcrafted crochet product with premium yarn. Durable and unique design.'
        };
        setProduct(adapted);
        if (adapted.images?.length > 0) {
          setSelectedImage(adapted.images[0]);
        }
      } catch (error) {
        console.error("ProductDetail fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);


  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
    window.scrollTo(0, 0);
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + qty }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A3434] mx-auto mb-4"></div>
          <p className="text-[#4A3434] font-bold">Loading product...</p>
        </div>
      </div>
    );
  }

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
      
      {/* BREADCRUMBS */}
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
          
          {/* IMAGE SECTION */}
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
             {product.images && product.images.length > 1 && (
               <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                 {product.images.map((img, idx) => (
                   <img 
                     key={idx} 
                     src={img} 
                     onClick={() => setSelectedImage(img)}
                     className={`w-20 h-20 object-cover cursor-pointer border-2 transition-all rounded-sm ${selectedImage === img ? 'border-[#3A56AF] ring-2 ring-[#3A56AF]/30' : 'border-transparent'}`} 
                   />
                 ))}
               </div>
             )}
          </div>

          {/* INFO SECTION */}
          <div className="flex flex-col py-2">
            <h1 className="text-2xl md:text-4xl font-bold text-[#4A3434] mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-300 line-through text-lg">₹{product.oldPrice}</span>
              <span className="text-3xl font-bold text-[#3A56AF]">₹{product.price}</span>
            </div>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-green-600 uppercase bg-green-50 px-2 py-1 rounded">In Stock</span>
            </div>

            {/* PINK CART NOTICE */}
            <div className="bg-[#FFF5F5] border border-[#FFB1B1]/20 p-4 rounded-sm flex items-center gap-3 mb-8 shadow-sm">
               <ShoppingCart size={18} className="text-[#FFB1B1]" />
               <p className="text-[12px] font-medium text-[#4A3434]">
                 This product has been added to <span className="font-bold">2 people's</span> carts.
               </p>
            </div>

            {/* QTY & BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center border border-gray-200 bg-white h-11 rounded-sm">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 text-gray-400 hover:text-[#4A3434]"><Minus size={16}/></button>
                <span className="px-4 font-bold text-[#4A3434] border-x border-gray-100 min-w-[45px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 text-gray-400 hover:text-[#4A3434]"><Plus size={16}/></button>
              </div>
              
              <button 
                onClick={handleAddToCart} 
                className="bg-[#3A56AF] text-white font-bold h-11 px-8 rounded-sm text-xs uppercase tracking-widest hover:bg-[#2e458e] shadow-md transition-all active:scale-95 flex-1"
              >
                Add to cart
              </button>
            </div>

            {/* DESCRIPTION */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>
              
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-6">
                Category: <span className="text-[#4A3434] font-black">{product.category}</span>
              </p>
              
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, MessageCircle].map((Icon, i) => (
                  <button key={i} className="text-gray-400 hover:text-[#3A56AF] transition-colors p-2">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
