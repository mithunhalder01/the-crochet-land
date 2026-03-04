export default function TopProducts() {
  const topProducts = [
    { name: "Crochet Bag", sold: 45 },
    { name: "Cute Pots", sold: 32 },
    { name: "Keychain", sold: 28 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Top Selling Products
      </h2>

      {topProducts.map((product, index) => (
        <div
          key={index}
          className="flex justify-between border-t py-2"
        >
          <span>{product.name}</span>
          <span>{product.sold} sold</span>
        </div>
      ))}
    </div>
  );
}