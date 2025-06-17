import React from "react";
import "./CryptoCard.css";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function CryptoCard({ coin, onClick }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  const sparklineData = coin.sparkline_in_7d?.price.map((p, i) => ({
    value: p,
    i,
  }));

  return (
    <div
      className="card"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${coin.name}`}
    >
      <img
        src={coin.image}
        alt={`${coin.name} logo`}
        className="card-img"
        loading="lazy"
      />
      <h3>{coin.name}</h3>
      <p className="symbol">{coin.symbol.toUpperCase()}</p>
      <p className="price">Price: ${coin.current_price.toLocaleString()}</p>
      <p className={isPositive ? "green" : "red"}>
        24h: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="market-cap">
        Market Cap: ${coin.market_cap.toLocaleString()}
      </p>
      <p className="volume">
        Volume: ${coin.total_volume.toLocaleString()}
      </p>

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
