import React from "react";
import "./CryptoCard.css";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Card component for displaying individual cryptocurrency data
function CryptoCard({ coin, onClick }) {
  // Check if the 24h change is positive (used for coloring text/chart)
  const isPositive = coin.price_change_percentage_24h >= 0;

  // Transform sparkline data into a format suitable for Recharts
  const sparklineData = coin.sparkline_in_7d?.price.map((p, i) => ({
    value: p,
    i,
  }));

  return (
    <div
      className="card"
      onClick={onClick} // trigger modal or detail view on click
      onKeyDown={(e) => e.key === "Enter" && onClick()} // support keyboard accessibility
      role="button"
      tabIndex={0} // make the card focusable
      aria-label={`View details for ${coin.name}`}
    >
      {/* Coin logo */}
      <img
        src={coin.image}
        alt={`${coin.name} logo`}
        className="card-img"
        loading="lazy"
      />

      {/* Coin name and symbol */}
      <h3>{coin.name}</h3>
      <p className="symbol">{coin.symbol.toUpperCase()}</p>

      {/* Current price */}
      <p className="price">Price: ${coin.current_price.toLocaleString()}</p>

      {/* 24h change percentage, colored based on gain/loss */}
      <p className={isPositive ? "green" : "red"}>
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>

      {/* Market cap and volume */}
      <p className="market-cap">
        Market Cap: ${coin.market_cap.toLocaleString()}
      </p>
      <p className="volume">
        Volume: ${coin.total_volume.toLocaleString()}
      </p>

      {/* Mini line chart showing 7-day trend (if data available) */}
      {sparklineData && (
        <div style={{ width: "100%", height: 80 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Tooltip
                formatter={(value) => `$${value.toFixed(2)}`}
                labelFormatter={() => ""}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? "#2ecc71" : "#e74c3c"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default CryptoCard;
