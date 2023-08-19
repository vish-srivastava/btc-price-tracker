import React, { useState } from "react";
import "./App.css";
import CurrencyDropdown from "./CurrencyDropdown";
import HistoricalData from "./HistoricalData";
import Graph from "./Graph";

function App() {
  // State to store the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Function to handle currency selection
  const handleCurrencySelect = (event) => {
    setSelectedCurrency(event.target.value);
  };

  console.log("Rendering App component...");

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Crypto Currency Price Tracker</h1>
        {/* <div className="divider"></div> */}
        {/* Currency dropdown component */}
        <div className="info-label">
        <CurrencyDropdown onSelectCurrency={handleCurrencySelect} />
        </div>
        
      </header>
      <main className="body">
        <HistoricalData currency={selectedCurrency}>
          {(historicalData) =>
            selectedCurrency && (
              <div>
                <Graph data={historicalData} />{" "}
              </div>
            )
          }
        </HistoricalData>
      </main>
      {/* <div className="author-details">Author: Vishal Srivastava</div> */}
    </div>
  );
}

export default App;
