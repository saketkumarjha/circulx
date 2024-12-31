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
import { Card } from "@/components/ui/card"

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
        data: [45000, 48000, 42000, 38000, 35000, 30000],
        borderColor: "rgb(255, 98, 0)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(255, 98, 0, 0.3)");
          gradient.addColorStop(1, "rgba(255, 98, 0, 0)");
          return gradient;
        },
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
      }
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '₹' + context.parsed.y.toLocaleString('en-IN');
            }
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          callback: function(this: any, tickValue: number | string, index: number, ticks: any[]) {
            if (typeof tickValue === 'number') {
              return `₹${tickValue.toLocaleString()}`;
            }
            return tickValue;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Sales Trends</h3>
      </div>
      <div className="relative h-[200px]">
        <Line data={data} options={options} />
        <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
          <div className="flex items-center gap-2 text-xs text-orange-500">
            <span>4,890:</span>
            <span>Low sales in June</span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Revenue this month:</span>
          <span className="font-medium">₹1,50,000</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Top Product:</span>
          <span className="font-medium">Aluminum Scrap (₹50,000 sales)</span>
        </div>
      </div>
    </Card>
  )
}

