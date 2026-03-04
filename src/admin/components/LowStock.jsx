export default function LowStock() {
  const products = [
    { name: "Sunflower Crochet", stock: 2 },
    { name: "Plush Toy", stock: 1 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Low Stock Alert
      </h2>

      {products.map((product, index) => (
        <div
          key={index}
          className="flex justify-between border-t py-2"
        >
          <span>{product.name}</span>
          <span className="text-red-500 font-semibold">
            {product.stock} left
          </span>
        </div>
      ))}
    </div>
  );
}