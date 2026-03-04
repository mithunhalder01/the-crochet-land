import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrdersPie() {
  const data = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        data: [12, 19, 30, 5],
        backgroundColor: [
          "#FBBF24",
          "#3B82F6",
          "#10B981",
          "#EF4444",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Order Status
      </h2>
      <div className="mx-auto h-56 w-56">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
