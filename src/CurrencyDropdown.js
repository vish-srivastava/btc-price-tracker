import React, { useState, useEffect } from 'react';

function CurrencyDropdown({ onSelectCurrency }) {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/available-currencies')
      .then(response => response.json())
      .then(data => setCurrencies(data.data));
  }, []);

  return (
    <div>
      <select onChange={onSelectCurrency}>
        <option value="">Select a currency</option>
        {currencies.map(currency => (
          <option key={currency.currency} value={currency.currency}>
            {currency.currency} - {currency.country}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyDropdown;
