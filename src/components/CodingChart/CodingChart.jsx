import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import './CodingChart.css'
import '../Chart.css'

const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "#FF4444", "#AA336A", "#66CCFF"];

const CodingChart = ({ problems }) => {
  const [chartType, setChartType] = useState("status");

  // Prepare chart data based on selected chart type
  const getChartData = () => {
    const count = {};
    (problems || []).forEach((p) => {
      let key = "";
      if (chartType === "status") key = p.status;
      if (chartType === "platform") key = p.platform;
      if (chartType === "type") key = p.problemType;
      if (!key) return; // skip empty values
      count[key] = (count[key] || 0) + 1;
    });

    return Object.keys(count).map((k) => ({
      name: k,
      value: count[k],
    }));
  };

  const chartData = getChartData();

  return (
    <div className="chart-wrapper">
      <h3>Coding Stats</h3>

      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        <option value="status">Status</option>
        <option value="platform">Platform</option>
        <option value="type">Problem Type</option>
      </select>

      <PieChart width={350} height={350}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CodingChart;