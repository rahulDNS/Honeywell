import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import data from "../data/foodData.json";

const PieChartComponent = () => {
  const navigate = useNavigate();

  const grouped = data.reduce((acc, item) => {
    const status = item["Consumption Status"];
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#4F8BC9", "#72C39B", "#87CEEB"];


  const handleClick = (entry) => {
    // Only navigate — no download here!
    navigate(`/details/${entry.name}`);
  };

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        dataKey="value"
        onClick={handleClick}
      >
        {pieData.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            cursor="pointer"
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;
