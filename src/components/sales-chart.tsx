"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

// Sales chart component that displays sales trends
export function SalesChart() {
  const data = {
    labels: ["Mon 10", "Tues 11", "Wed 12", "Thurs 13", "Fri 14", "Sat 15"],
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: [30000, 45000, 40000, 35000, 25000, 20000],
        borderColor: "rgb(255, 98, 0)",
        backgroundColor: "rgba(255, 98, 0, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Sales Trends</h3>
      </div>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Revenue this month:</span>
          <span className="font-medium">₹1,50,000</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Top Product:</span>
          <span className="font-medium">Aluminum Scrap (₹50,000 sales)</span>
        </div>
      </div>
    </div>
  )
}

