import React from "react";
import jsPDF from "jspdf";

const sopData = [
  {
    route: "NYC-LAX",
    projectedWasteKg: 4.2,
    risk: "High",
    recommendations: [
      "Reduce Chicken Pasta by 20%",
      "Replace salad with fruit bowl for age 60+",
      "Limit beverage choices to 2 per tray"
    ]
  },
  {
    route: "SEA-JFK",
    projectedWasteKg: 2.3,
    risk: "Low",
    recommendations: [
      "Maintain current menu plan",
      "Offer extra fruit for passengers under 25"
    ]
  },
  {
    route: "LAX-SFO",
    projectedWasteKg: 3.5,
    risk: "Medium",
    recommendations: [
      "Reduce bread rolls by 30%",
      "Offer plant-based dessert option"
    ]
  }
];

const getColor = (risk) => {
  switch (risk) {
    case "High": return "#f87171"; // red
    case "Medium": return "#facc15"; // yellow
    case "Low": return "#4ade80"; // green
    default: return "#d1d5db";
  }
};

const SOPPage = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Standard Operating Procedure: Flight Meal Forecast", 14, 20);
    let y = 30;

    sopData.forEach((sop, index) => {
      doc.setFontSize(12);
      doc.text(`Route: ${sop.route}`, 14, y);
      doc.text(`Projected Waste: ${sop.projectedWasteKg} kg`, 80, y);
      doc.text(`Risk: ${sop.risk}`, 150, y);
      y += 6;
      doc.setFontSize(10);
      sop.recommendations.forEach(rec => {
        doc.text(`- ${rec}`, 18, y);
        y += 5;
      });
      y += 8;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("Flight_Waste_SOP.pdf");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Inventory Recommendations</h2>
      <p>AI-style suggestions based on recent food waste per route</p>

      {sopData.map((sop, idx) => (
        <div
          key={idx}
          style={{
            borderLeft: `6px solid ${getColor(sop.risk)}`,
            padding: "1rem",
            marginBottom: "1.5rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px"
          }}
        >
          <h3>{sop.route}</h3>
          <p><strong>Projected Waste:</strong> {sop.projectedWasteKg} kg</p>
          <p><strong>Risk Level:</strong> {sop.risk}</p>
          <ul>
            {sop.recommendations.map((rec, i) => (
              <li key={i}>🔸 {rec}</li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={generatePDF} style={{ padding: "10px 20px", marginTop: "1rem" }}>
        📥 Export SOP as PDF
      </button>
    </div>
  );
};

export default SOPPage;
