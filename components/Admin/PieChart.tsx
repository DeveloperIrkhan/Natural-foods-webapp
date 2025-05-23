import { number } from "framer-motion";
import React from "react";
interface IPieChartProps {
  chartTitle: string;
  value: number;
}
const PieChart = ({ value, chartTitle }: IPieChartProps) => {
  const getColor = (persentage: number) => {
    if (persentage <= 25) return "#f44336"; // Red
    if (persentage <= 50) return "#42A5F5"; // Yellow
    if (persentage <= 75) return "#66BB6A"; // Orange
    return "#FFA000";
  };
  const persentage = Math.min(value,100)
  const progressColor = getColor(persentage);
  
  const getProgress = (persentage: number) => {
    if (persentage <= 25) return "Normal";
    if (persentage <= 50) return "Good"; // Yellow
    if (persentage <= 75) return "Best"; // Orange
    return "Outstanding";
  };
  const Progress = getProgress(persentage);

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-4 flex flex-col items-center justify-center relative">
      <h2 className="text-sm font-bold text-gray-700 mb-4">{chartTitle}</h2>

      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Ring using conic gradient */}
        <div
          className={`w-full h-full rounded-full`}
          style={{
            background: `conic-gradient(${progressColor} 0% ${persentage}%, #e0e0e0 ${persentage}% 100%)`
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gray-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold">{persentage}%</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between w-full px-4 text-sm text-gray-600">
        <span>Progress</span>
        <span className="font-semibold text-black">{Progress}</span>
      </div>
    </div>
  );
};

export default PieChart;

/*



  return (
    <div className="w-64 h-64 bg-gray-200 rounded-xl shadow-md p-4 flex flex-col items-center justify-center relative">
      <h2 className="text-sm font-semibold text-gray-500 mb-1">Revenue Goal</h2>

      <div className="relative w-40 h-40 flex items-center justify-center">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(${progressColor} 0% ${value}%, #e0e0e0 ${value}% 100%)`,
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold">{value}%</p>
              <p className="text-xs text-gray-500">Total Profit</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between w-full px-4 text-sm text-gray-600">
        <span>Plan Completed</span>
        <span className="font-semibold text-black">$8796</span>
      </div>
    </div>
  );
};


*/
