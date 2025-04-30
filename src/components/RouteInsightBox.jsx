import React from 'react';

const RouteInsightBox = ({ selectedRoute, insights }) => {
  if (!insights || !insights[selectedRoute]) return null;

  const items = insights[selectedRoute];
  const topItem = items.reduce((prev, curr) =>
    prev.waste > curr.waste ? prev : curr
  );

  return (
    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
      <h4>📦 Waste Breakdown for {selectedRoute}</h4>
      <ul>
        {items.map((item, index) => (
          <li key={index}><strong>{item.name}:</strong> {item.waste}g</li>
        ))}
      </ul>
      <p><strong>✈️ Insight:</strong> {selectedRoute} has significant waste from <strong>{topItem.name}</strong>. Consider reducing quantity or offering alternatives.</p>
    </div>
  );
};

export default RouteInsightBox;
