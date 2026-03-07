import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import './JobChart.css'
import '../Chart.css'

const JobChart = ({ jobs }) => {

  const [chartType, setChartType] = useState("status");

  const COLORS = ["#0088FE", "#00C49F", "#FF8042", "#FFBB28", "#FF4444"];

  let chartData = [];

  if (chartType === "status") {
    chartData = [
      { name: "Applied", value: jobs.filter(j => j.status === "Applied").length },
      { name: "Interview", value: jobs.filter(j => j.status === "Interview").length },
      { name: "Rejected", value: jobs.filter(j => j.status === "Rejected").length }
    ];
  }

  if (chartType === "role") {
    const roles = {};

    jobs.forEach(job => {
      roles[job.role] = (roles[job.role] || 0) + 1;
    });

    chartData = Object.keys(roles).map(role => ({
      name: role,
      value: roles[role]
    }));
  }

  if (chartType === "portal") {
    const portals = {};

    jobs.forEach(job => {
      portals[job.portal] = (portals[job.portal] || 0) + 1;
    });

    chartData = Object.keys(portals).map(portal => ({
      name: portal,
      value: portals[portal]
    }));
  }

  return (
    <div className="chart-wrapper">

      <h3>Job Analytics</h3>

      <select onChange={(e) => setChartType(e.target.value)}>
        <option value="status">Status</option>
        <option value="role">Role</option>
        <option value="portal">Portal</option>
      </select>

      <PieChart width={300} height={300}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
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

export default JobChart;