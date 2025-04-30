import React, { useState } from "react";
import logo from "../assets/inflight-logo.png";
import PieChartFood from "./PieChartFood";
import PieChartBeverage from "./PieChartBeverage";
import BarChartComponent from "./BarChartComponent";
import RouteLineChart from "./RouteLineChart";
import AgeGroupDetails from "./AgeGroupDetails";
import RouteInsightBox from "./RouteInsightBox";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [showQuarterlyChart, setShowQuarterlyChart] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedRoute(searchQuery.trim().toUpperCase());
      setShowQuarterlyChart(true);
    }
  };

  const handleBack = () => {
    setSearchQuery("");
    setSelectedRoute("");
    setShowQuarterlyChart(false);
  };

  return (
    <div style={{ padding: "1rem", background: "linear-gradient(to bottom right, #e0f7fa, #d0f4de)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="In-Flight Insights Logo" style={{ height: "70px", marginRight: "10px" }} />
          <h1 style={{ fontSize: "1.8rem", color: "#1e88e5" }}>Sustainability Analytics</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Enter Flight Route"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "0.6rem",
              fontSize: "0.9rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "150px"
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Search
          </button>
          <nav style={{ display: "flex", gap: "1rem", fontSize: "0.9rem" }}>
            <a href="#dashboard" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>Dashboard</a>
            <a href="#reports" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>Reports</a>
            <a href="#settings" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>Settings</a>
            <a href="#profile" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>Profile</a>
          </nav>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1rem", flexWrap: "wrap", gap: "1rem", }}>
        {[
          { label: "💰 Cost Savings", value: "$1.2M"},
          { label: "♻️ Waste Saved", value: "210 kg" },
          { label: "✈️ Routes Analyzed", value: "350" },
          { label: "🌍 CO₂ Saved", value: "28 tonnes" }
        ].map((kpi, i) => (
          <div
  key={i}
  style={{
    flex: "1 1 180px",
    background: "linear-gradient(to right, #d0f4de, #e0f7fa)",
    padding: "0.8rem",
    borderRadius: "10px",
    textAlign: "center",
    border: "2px solid black",  // 🆕 black outline
    boxShadow: "0 0 5px rgba(0,0,0,0.15)"
  }}
>

            <h3 style={{ fontSize: "1.6rem", margin: "0.2rem" }}>{kpi.label}</h3>
            <p style={{ fontSize: "1.6rem", fontWeight: "bold", margin: "0.2rem" }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Searched Quarterly Chart - Clean */}
      {showQuarterlyChart && selectedRoute && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ textAlign: "center", color: "#1976d2" }}>
            Waste Trend (Quarterly) for {selectedRoute}
          </h3>
          <div style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "10px" }}>
            <RouteLineChart route={selectedRoute} />
          </div>
          <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
            <button
              onClick={handleBack}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "0.3rem 0.8rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      {/* Main Graphs Section */}
      <div style={{ display: "flex", marginTop: "2rem", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ flex: "1 1 45%", backgroundColor: "#f8f9fa", borderRadius: "10px", padding: "1rem" }}>
          <h3 style={{ textAlign: "center" }}>Consumption Breakdown</h3>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <h4>Food</h4>
              <PieChartFood />
            </div>
            <div style={{ textAlign: "center" }}>
              <h4>Beverages</h4>
              <PieChartBeverage />
            </div>
          </div>
          <div style={{ marginTop: "1rem", background: "#eef6f8", padding: "0.8rem", borderRadius: "8px" }}>
            <p style={{ fontSize: "0.95rem", margin: 0 }}>
              🍽️ Based on in-flight data, <strong>60%</strong> of food and <strong>55%</strong> of beverages are fully consumed.
              However, <span style={{ color: "#e57373", fontWeight: "bold" }}>15%</span> of items consistently remain untouched.
              We recommend evaluating portion sizing or replacing low-engagement items to improve sustainability.
            </p>
          </div>
        </div>

        <div style={{ flex: "1 1 45%", backgroundColor: "#f8f9fa", borderRadius: "10px", padding: "1rem", minHeight: "420px" }}>

          <RouteLineChart />
        </div>
      </div>

      {/* Age Group Details */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Waste by Age Group</h3>
        <BarChartComponent />
        <AgeGroupDetails />
      </div>

      {/* Route Insights */}
      <RouteInsightBox />
    </div>
  );
}

export default Dashboard;
