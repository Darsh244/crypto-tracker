import React, { useState, useEffect } from "react";
import CryptoList from "./components/CryptoList";
import "./App.css";

function App() {
  // Dark/light theme state
  const [darkTheme, setDarkTheme] = useState(() => {
    // load saved preference or default to dark
    return localStorage.getItem("darkTheme") === "false" ? false : true;
  });

  // Save preference
  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  return (
    <div className={darkTheme ? "App dark" : "App light"}>
      <header>
        <h1>📈 Live Cryptocurrency Prices</h1>
        <button
          className="theme-toggle"
          onClick={() => setDarkTheme((prev) => !prev)}
          aria-label="Toggle dark/light theme"
        >
          {darkTheme ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <CryptoList />
    </div>
  );
}

export default App;
