export default function StatsGrid() {
  const stats = [
    { title: "Total Revenue", value: "₹1,24,500" },
    { title: "Total Orders", value: "132" },
    { title: "Total Users", value: "89" },
    { title: "Total Products", value: "24" },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-gray-500 text-sm">
            {item.title}
          </h3>
          <p className="text-3xl font-bold mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}