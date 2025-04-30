import React from "react";
import { useParams } from "react-router-dom";
import data from "../data/foodData.json";
import jsPDF from "jspdf";

const DetailPage = () => {
  const { status } = useParams();
  const filteredItems = data.filter(item => item["Consumption Status"] === status);

  const generatePDF = () => {
    const doc = new jsPDF();

    const totalWeight = filteredItems.reduce((acc, item) => acc + item["Weight (g)"], 0);
    const avgWeight = (totalWeight / filteredItems.length).toFixed(2);

    const summary = `
This report presents an analysis of in-flight meal trays categorized under "${status}". A total of ${filteredItems.length} trays fall into this category, with a combined food waste of ${totalWeight} grams and an average of ${avgWeight} grams per tray.

This data provides insight into passenger preferences and consumption habits. Sustainability officers can use this breakdown to identify low-performing meals, optimize portion sizes, and make route-specific menu decisions that reduce waste and improve meal satisfaction.

The detailed tray-level data that follows includes passenger age groups, flight routes, and individual waste metrics.
    `;

    doc.setFontSize(12);
    doc.text(`Summary for: ${status}`, 14, 20);
    doc.setFontSize(10);
    doc.text(doc.splitTextToSize(summary, 180), 14, 30);

    let y = 70;

    // Table headers
    doc.text("Tray ID", 14, y);
    doc.text("Food Item", 34, y);
    doc.text("Age", 84, y);
    doc.text("Meal", 104, y);
    doc.text("Route", 134, y);
    doc.text("Weight (g)", 164, y);
    y += 8;

    // Table data
    filteredItems.forEach((item, index) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(item["Tray ID"], 14, y);
      doc.text(item["Food Item"], 34, y);
      doc.text(item["Passenger Age"], 84, y);
      doc.text(item["Meal Type"], 104, y);
      doc.text(item["Flight Route"], 134, y);
      doc.text(item["Weight (g)"].toString(), 164, y);

      y += 6;
    });

    doc.save(`${status.replace(" ", "_")}_Summary.pdf`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Details for: {status}</h2>
      <p><strong>Total Trays:</strong> {filteredItems.length}</p>
      <button onClick={generatePDF} style={{ margin: "10px 0" }}>
        📥 Export PDF
      </button>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>Tray ID</th>
            <th>Food Item</th>
            <th>Meal Type</th>
            <th>Flight Route</th>
            <th>Passenger Age</th>
            <th>Weight (g)</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, idx) => (
            <tr key={idx}>
              <td>{item["Tray ID"]}</td>
              <td>{item["Food Item"]}</td>
              <td>{item["Meal Type"]}</td>
              <td>{item["Flight Route"]}</td>
              <td>{item["Passenger Age"]}</td>
              <td>{item["Weight (g)"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailPage;
