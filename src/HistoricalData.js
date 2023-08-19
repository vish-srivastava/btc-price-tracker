import React, { useState, useEffect } from "react";
import moment from "moment";
import Graph from "./Graph";
import "./HistoricalData.css";

function HistoricalData({ currency }) {
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-02-01");
  const [data, setData] = useState(null);

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value;
    setStartDate(selectedStartDate);

    const newEndDate = moment(selectedStartDate)
      .add(1, "months")
      .format("YYYY-MM-DD");
    setEndDate(newEndDate);
  };

  const fetchData = async () => {
    if (!currency) {
      console.log("Please provide a currency");
      return;
    }

    const response = await fetch("http://localhost:8080/historical", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currencyType: "CRYPTO",
        currency: "BTC",
        targetCurrency: currency,
        startDate: startDate,
        endDate: endDate,
      }),
    });

    const responseData = await response.json();
    setData(responseData);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, currency]);

  return (
    <div>
      <input type="date" value={startDate} onChange={handleStartDateChange} />
      <input
        type="date"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value)}
      />
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          {data.response && (
            <div>
              <div className="historical-data">
              
                <div className="info-box">
                  <p className="info-label">Min Date:</p>
                  <p className="info-value">
                    {moment(data.minimaDate).format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="info-box">
                  <p className="info-label">Max Date:</p>
                  <p className="info-value">
                    {moment(data.maximaDate).format("YYYY-MM-DD")}
                  </p>
                </div>
                {data.currencyDisplayName && data.currencySymbol && (
                  <div className="info-box">
                    <p className="info-label">Currency :</p>
                    <p className="info-value">
                    ({data.currencySymbol}) {data.currencyDisplayName} {data.currencyName}
                    </p>
                  </div>
                )}
                {/* Other content */}
              </div>
              {currency && (
                <div className="graph-container">
                  <div>
                    <h2>Currency Value</h2>
                  </div>
                  <Graph
                    data={data.response.bpi}
                    minimaDate={data.minimaDate}
                    maximaDate={data.maximaDate}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HistoricalData;
