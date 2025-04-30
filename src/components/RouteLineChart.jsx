import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const RouteLineChart = () => {
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const data = [
    { quarter: "Q1", waste: 4500, fullyEaten: ["Rice Bowl", "Salad"], untouched: ["Fruit Cup"] },
    { quarter: "Q2", waste: 3900, fullyEaten: ["Chicken Wrap", "Bread Roll"], untouched: ["Pasta"] },
    { quarter: "Q3", waste: 3400, fullyEaten: ["Paneer Wrap", "Yogurt"], untouched: ["Muffin"] },
    { quarter: "Q4", waste: 3100, fullyEaten: ["Sandwich", "Juice"], untouched: ["Cookie"] }
  ];

  const handleClick = (data) => {
    if (data && data.activePayload && data.activePayload[0]) {
      setSelectedQuarter(data.activePayload[0].payload);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "10px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Waste Trend - SEA-JFK</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={handleClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis label={{ value: "Waste (g)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="waste" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      {selectedQuarter && (
        <div style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "#eef7fa",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}>
          <h4>🧾 Waste Breakdown for {selectedQuarter.quarter}</h4>
          <ul>
            <li><strong>Untouched:</strong> {selectedQuarter.untouched.join(", ")}</li>
            <li><strong>Fully Eaten:</strong> {selectedQuarter.fullyEaten.join(", ")}</li>
          </ul>
          <p><strong>💡 Insight:</strong> In {selectedQuarter.quarter}, {selectedQuarter.untouched[0]} had low engagement. Consider offering a substitute or reducing quantity.</p>
        </div>
      )}
    </div>
  );
};

export default RouteLineChart;
