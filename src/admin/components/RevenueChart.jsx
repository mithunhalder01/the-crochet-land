import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function RevenueChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [1200, 1900, 3000, 2500, 2200, 4000, 3500],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Weekly Revenue
      </h2>
      <Line data={data} />
    </div>
  );
}