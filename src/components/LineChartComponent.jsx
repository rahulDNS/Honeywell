import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../data/foodData.json";

const LineChartComponent = () => {
  // Group waste per flight route
  const routeWasteMap = {};

  data.forEach((item) => {
    const route = item["Flight Route"];
    const waste = item["Weight (g)"];
    if (!routeWasteMap[route]) {
      routeWasteMap[route] = 0;
    }
    routeWasteMap[route] += waste;
  });

  // Format for chart
  const chartData = Object.entries(routeWasteMap).map(([route, totalWaste]) => ({
    route,
    waste: Math.round(totalWaste),
  }));

  return (
    <div style={{ marginTop: "1rem" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="route" />
          <YAxis label={{ value: "Waste (g)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="waste" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
