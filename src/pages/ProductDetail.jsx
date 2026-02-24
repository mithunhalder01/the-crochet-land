import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <p className="text-center mt-10">Product not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-6 items-start">

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl shadow-lg object-cover"
        />

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {product.discount && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
              {product.discount} OFF
            </span>
          )}

          <p className="text-gray-600">{product.description}</p>

          <div className="flex gap-4 items-center">
            <span className="text-gray-400 line-through">
              {product.oldPrice}
            </span>
            <span className="text-2xl font-bold">{product.price}</span>
          </div>

          <button className="bg-[#d6c4b0] text-white px-6 py-3 rounded-full hover:scale-105 transition">
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}
