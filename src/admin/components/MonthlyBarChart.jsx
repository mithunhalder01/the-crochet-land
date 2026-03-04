import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

export default function MonthlyBarChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [15000, 22000, 18000, 28000, 32000, 25000],
        // Professional Blue Gradient
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#3B82F6"); // Darker blue
          gradient.addColorStop(1, "#60A5FA"); // Lighter blue
          return gradient;
        },
        hoverBackgroundColor: "#2563EB",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 32, // Professional slim look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Cleaner look without legend
      },
      tooltip: {
        backgroundColor: "#1E293B",
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          label: (context) => `₹${context.raw.toLocaleString('en-IN')}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical lines for clean UI
        },
        ticks: {
          font: { size: 12, weight: '500' },
          color: "#64748b",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f1f5f9", // Very light grid lines
          drawBorder: false,
        },
        ticks: {
          font: { size: 11 },
          color: "#94a3b8",
          callback: (value) => `₹${value / 1000}k`, // Show in 'k' format
        },
      },
    },
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Revenue Analytics
          </h2>
          <p className="text-xs text-slate-400 font-medium">Last 6 months performance</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Net Growth</span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div> 
  );
}