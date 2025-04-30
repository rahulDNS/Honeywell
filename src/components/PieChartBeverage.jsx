import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Fully Consumed", value: 55 },
  { name: "Partially Consumed", value: 30 },
  { name: "Untouched", value: 15 }
];

const COLORS = ["#1f77b4", "#2ca02c", "#ff9896"]; // Blue, Green, Pinkish-Red

const PieChartBeverage = () => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
      cx="50%"
      cy="40%"
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

export default PieChartBeverage;
