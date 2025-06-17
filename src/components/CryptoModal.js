import React from "react";
import "./CryptoModal.css";

// Modal component for displaying detailed information about a cryptocurrency
function CryptoModal({ coin, onClose }) {
  return (
    // The dark background behind the modal – clicking it will close the modal
    <div className="modal-backdrop" onClick={onClose}>
      {/* Stop click events inside the modal from closing it */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Close button (×) in the corner */}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {/* Coin image/logo */}
        <img src={coin.image} alt={coin.name} className="modal-img" />

        {/* Coin name and ticker symbol */}
        <h2>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h2>

        {/* Various coin stats, formatted with commas */}
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

