import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Fully Eaten", value: 60 },
  { name: "Partially Eaten", value: 25 },
  { name: "Untouched", value: 15 }
];

const COLORS = ["#1f77b4", "#2ca02c", "#ff9896"]; // Blue, Green, Pinkish-Red

const PieChartFood = () => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ value }) => `${value}`}
      outerRadius={80}
      dataKey="value"
    >
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
  </PieChart>
);

export default PieChartFood;
