import React from "react";
import "./CryptoModal.css";

function CryptoModal({ coin, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={coin.image} alt={coin.name} className="modal-img" />
        <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
        <p>Current Price: ${coin.current_price.toLocaleString()}</p>
        <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
        <p>24h High: ${coin.high_24h.toLocaleString()}</p>
        <p>24h Low: ${coin.low_24h.toLocaleString()}</p>
        <p>Circulating Supply: {coin.circulating_supply.toLocaleString()}</p>
        <p>Total Volume: ${coin.total_volume.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CryptoModal;
