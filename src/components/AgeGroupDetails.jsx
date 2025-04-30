import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/foodData.json";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AgeGroupDetails = () => {
  const { age } = useParams();

  // If no age is selected (e.g., landing directly on dashboard)
  if (!age) {
    return (
      <p style={{ fontStyle: "italic" }}>
        [Details will be shown here on click of bar chart]
      </p>
    );
  }

  const filteredItems = data.filter((item) => item["Passenger Age"] === age);

  const totalWaste = filteredItems.reduce((sum, item) => sum + item["Weight (g)"], 0);
  const averageWaste = filteredItems.length > 0 ? (totalWaste / filteredItems.length).toFixed(2) : 0;

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`🧾 Waste Report for Age Group: ${age}`, 14, 15);
    doc.text(`This report outlines the waste profile for passengers aged ${age}. A total of ${filteredItems.length} trays were recorded, amounting to ${totalWaste} grams of waste.`, 14, 25);
    doc.autoTable({
      startY: 35,
      head: [["Tray ID", "Food Item", "Flight Route", "Waste (g)"]],
      body: filteredItems.map((item) => [
        item["Tray ID"],
        item["Food Item"],
        item["Flight Route"],
        item["Weight (g)"],
      ]),
    });
    doc.save(`Waste_Report_${age}.pdf`);
  };

  return (
    <div>
      <h3>📋 Waste Details for Age Group: {age}</h3>
      <p>Total Trays: {filteredItems.length}</p>
      <p>Total Waste: {totalWaste}g | Average Waste: {averageWaste}g</p>
      <button onClick={exportPDF} style={{ marginBottom: "1rem" }}>
        📄 Export PDF
      </button>

      <table border="1" cellPadding="8" style={{ width: "100%", backgroundColor: "#fff" }}>
        <thead>
          <tr>
            <th>Tray ID</th>
            <th>Food Item</th>
            <th>Flight Route</th>
            <th>Waste (g)</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item["Tray ID"]}</td>
              <td>{item["Food Item"]}</td>
              <td>{item["Flight Route"]}</td>
              <td>{item["Weight (g)"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgeGroupDetails;
