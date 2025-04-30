import React from 'react';

const RouteFilter = ({ selectedRoute, setSelectedRoute, handleFilter }) => {
  const routes = ['SEA-JFK', 'ATL-PHX', 'LAX-SFO', 'MIA-ORD', 'NYC-LAX', 'LAS-DFW', 'BOS-DEN'];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', justifyContent: 'center' }}>
      <select
        value={selectedRoute}
        onChange={(e) => setSelectedRoute(e.target.value)}
        style={{ padding: '8px 12px', fontSize: '14px' }}
      >
        {routes.map((route) => (
          <option key={route} value={route}>
            {route}
          </option>
        ))}
      </select>
      <button
        onClick={handleFilter}
        style={{ backgroundColor: '#1e90ff', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Filter by Flight Route
      </button>
    </div>
  );
};

export default RouteFilter;
