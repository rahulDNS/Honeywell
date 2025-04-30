import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import data from "../data/foodData.json";

const BarChartComponent = () => {
  const navigate = useNavigate();

  // Group data by Age Group and total waste per group
  const grouped = data.reduce((acc, item) => {
    const age = item["Passenger Age"];
    acc[age] = (acc[age] || 0) + item["Weight (g)"];
    return acc;
  }, {});

  // Convert to array and sort by waste descending
  const chartData = Object.entries(grouped)
    .map(([age, total]) => ({ age, waste: Math.round(total) }))
    .sort((a, b) => b.waste - a.waste);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  const handleClick = (data) => {
    navigate(`/age-details/${data.age}`);
  };

  return (
    <BarChart width={500} height={300} data={chartData}>
      <XAxis dataKey="age" />
      <YAxis label={{ value: "Waste (g)", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Bar dataKey="waste" fill="#8884d8" onClick={(e) => handleClick(e)}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} cursor="pointer" fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default BarChartComponent;
