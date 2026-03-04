export default function RecentOrders() {
  const orders = [
    { id: "#1021", user: "Ravi", amount: "₹1200", status: "Pending" },
    { id: "#1022", user: "Aman", amount: "₹2500", status: "Delivered" },
    { id: "#1023", user: "Priya", amount: "₹1800", status: "Shipped" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Recent Orders
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t">
              <td>{order.id}</td>
              <td>{order.user}</td>
              <td>{order.amount}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}