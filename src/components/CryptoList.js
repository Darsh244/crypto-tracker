import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CryptoCard from "./CryptoCard";
import CryptoModal from "./CryptoModal";
import "./CryptoList.css";

// Main component to display list of cryptocurrencies
function CryptoList() {
  // State for all the coins fetched from the API
  const [coins, setCoins] = useState([]);
  // User's search query
  const [search, setSearch] = useState("");
  // Coin selected for modal view
  const [selectedCoin, setSelectedCoin] = useState(null);
  // Whether data is currently being fetched
  const [loading, setLoading] = useState(false);
  // Sort option selected by the user
  const [sortKey, setSortKey] = useState("market_cap_desc");
  // Timestamp of last successful update
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch coin data when component mounts or sort key changes
  useEffect(() => {
    let intervalId;

    const fetchCoins = async () => {
      setLoading(true);
      try {
        // Only allow certain descending sort options to go through API
        const apiSort =
          sortKey.endsWith("_desc") &&
          (sortKey.startsWith("market_cap") ||
            sortKey.startsWith("volume") ||
            sortKey.startsWith("id") ||
            sortKey.startsWith("gecko"))
            ? sortKey
            : "market_cap_desc";

        // Get coin data from CoinGecko
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: apiSort,
              per_page: 100,
              page: 1,
              sparkline: true, // small line chart data
            },
          }
        );
        setCoins(res.data); // update state
        setLastUpdated(new Date()); // set time
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins(); // initial fetch

    // Set up polling to refresh data every 30 seconds
    intervalId = setInterval(fetchCoins, 30000);

    // Clean up interval when component unmounts or sort changes
    return () => clearInterval(intervalId);
  }, [sortKey]);

  // Filter coins based on search input
  const filteredCoins = useMemo(() => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  // Sort coins based on selected sort option (handled client-side)
  const sortedCoins = useMemo(() => {
    const coinsCopy = [...filteredCoins];

    switch (sortKey) {
      case "market_cap_asc":
        return coinsCopy.sort((a, b) => a.market_cap - b.market_cap);
      case "market_cap_desc":
        return coinsCopy.sort((a, b) => b.market_cap - a.market_cap);
      case "price_asc":
        return coinsCopy.sort((a, b) => a.current_price - b.current_price);
      case "price_desc":
        return coinsCopy.sort((a, b) => b.current_price - a.current_price);
      case "price_change_24h_asc":
        return coinsCopy.sort(
          (a, b) =>
            (a.price_change_percentage_24h ?? 0) -
            (b.price_change_percentage_24h ?? 0)
        );
      case "price_change_24h_desc":
        return coinsCopy.sort(
          (a, b) =>
            (b.price_change_percentage_24h ?? 0) -
            (a.price_change_percentage_24h ?? 0)
        );
      case "volume_asc":
        return coinsCopy.sort((a, b) => a.total_volume - b.total_volume);
      case "volume_desc":
        return coinsCopy.sort((a, b) => b.total_volume - a.total_volume);
      case "id_asc":
        return coinsCopy.sort((a, b) =>
          (a.id ?? "").localeCompare(b.id ?? "")
        );
      case "id_desc":
        return coinsCopy.sort((a, b) =>
          (b.id ?? "").localeCompare(a.id ?? "")
        );
      default:
        return coinsCopy;
    }
  }, [filteredCoins, sortKey]);

  // List of available sort options for dropdown
  const sortOptions = [
    { label: "Market Cap ↓", value: "market_cap_desc" },
    { label: "Market Cap ↑", value: "market_cap_asc" },
    { label: "Price ↓", value: "price_desc" },
    { label: "Price ↑", value: "price_asc" },
    { label: "24h % ↓", value: "price_change_24h_desc" },
    { label: "24h % ↑", value: "price_change_24h_asc" },
    { label: "Volume ↓", value: "volume_desc" },
    { label: "Volume ↑", value: "volume_asc" },
    { label: "ID ↓", value: "id_desc" },
    { label: "ID ↑", value: "id_asc" },
  ];

  return (
    <div className="crypto-container">
      <div className="controls">
        {/* Search input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search cryptocurrencies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search cryptocurrencies"
        />

        {/* Sort dropdown */}
        <select
          className="sort-select"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          aria-label="Sort cryptocurrencies"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Show loading spinner or coin data */}
      {loading ? (
        <div className="spinner" aria-label="Loading..."></div>
      ) : (
        <>
          {/* Last updated time */}
          <div className="last-updated">
            Last updated:{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "..."}
          </div>

          {/* Grid of crypto cards */}
          <div className="crypto-grid">
            {sortedCoins.length > 0 ? (
              sortedCoins.map((coin) => (
                <CryptoCard
                  key={coin.id}
                  coin={coin}
                  onClick={() => setSelectedCoin(coin)}
                />
              ))
            ) : (
              <p className="no-results">No coins found.</p>
            )}
          </div>
        </>
      )}

      {/* Modal popup with detailed info */}
      {selectedCoin && (
        <CryptoModal
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
}

export default CryptoList;

