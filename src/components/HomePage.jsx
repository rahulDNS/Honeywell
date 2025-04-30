import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";

const routeOptions = ["NYC-LAX", "ATL-PHX", "SEA-JFK"];

const untouchedItemsData = {
  "NYC-LAX": [
    { name: "Salad", count: 30 },
    { name: "Bread Roll", count: 20 },
    { name: "Fruit Cup", count: 18 }
  ],
  "ATL-PHX": [
    { name: "Yogurt", count: 25 },
    { name: "Granola Bar", count: 15 },
    { name: "Egg Wrap", count: 12 }
  ],
  "SEA-JFK": [
    { name: "Pasta", count: 22 },
    { name: "Biscuit", count: 16 },
    { name: "Juice Box", count: 14 }
  ]
};

const costSavingsData = {
  "NYC-LAX": [
    { month: "Jan", savings: 5000 },
    { month: "Feb", savings: 5800 },
    { month: "Mar", savings: 6400 },
    { month: "Apr", savings: 7200 }
  ],
  "ATL-PHX": [
    { month: "Jan", savings: 4200 },
    { month: "Feb", savings: 5000 },
    { month: "Mar", savings: 5300 },
    { month: "Apr", savings: 6100 }
  ],
  "SEA-JFK": [
    { month: "Jan", savings: 3100 },
    { month: "Feb", savings: 4000 },
    { month: "Mar", savings: 4600 },
    { month: "Apr", savings: 5200 }
  ]
};

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState("");
  const [showGraphs, setShowGraphs] = useState(false);

  const handleFilter = () => {
    if (selectedRoute) {
      setShowGraphs(true);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#004e92", marginBottom: "1rem" }}>
        Welcome to In-Flight Insights ✈️
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: "600px", marginBottom: "2rem" }}>
        We help airlines reduce food waste and improve sustainability through AI-powered
        data collection and smart meal insights.
      </p>
      <p style={{ fontSize: "1rem", color: "#333", marginBottom: "2rem" }}>
        <strong>Co-founders:</strong> Carlos Chacon Cuesta | Rahul Sharma | Vijeth Patil
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "3rem"
        }}
      >
        Enter Dashboard
      </button>

      {/* Route filter section */}
      <div style={{ marginBottom: "1rem" }}>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem", marginRight: "1rem", borderRadius: "6px" }}
        >
          <option value="">Select Flight Route</option>
          {routeOptions.map((route) => (
            <option key={route} value={route}>
              {route}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          style={{
            padding: "10px 18px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            fontSize: "1rem",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Filter by Flight Route
        </button>
      </div>

      {/* Graphs */}
      {showGraphs && selectedRoute && (
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {/* Untouched Items Chart */}
          <div style={{ backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "10px" }}>
            <h3>Untouched/Substitutable Items for {selectedRoute}</h3>
            <ResponsiveContainer width={300} height={250}>
              <BarChart data={untouchedItemsData[selectedRoute]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff7f50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Savings Over Time */}
          <div style={{ backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "10px" }}>
            <h3>Cost Savings Over Time ({selectedRoute})</h3>
            <ResponsiveContainer width={350} height={250}>
              <LineChart data={costSavingsData[selectedRoute]}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#0088FE" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
