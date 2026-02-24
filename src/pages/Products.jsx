import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        All Products
      </h1>

      {/* Search + Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-full md:w-80"
        />

        <select className="border px-4 py-2 rounded-lg w-full md:w-60">
          <option value="">All Categories</option>
          <option value="bouquet">Bouquet</option>
          <option value="tulip">Tulip</option>
          <option value="daisy">Daisy</option>
        </select>

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

