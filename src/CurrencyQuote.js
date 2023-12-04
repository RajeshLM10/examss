// CurrencyQuote.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyQuote.css'; // Import the CSS file

const CurrencyQuote = () => {
  const [currencyOptions, setCurrencyOptions] = useState({});
  const [currentCurrency, setCurrentCurrency] = useState(null);

  useEffect(() => {
    fetchCurrencyOptions();
  }, []);

  const fetchCurrencyOptions = async () => {
    try {
      const response = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
      setCurrencyOptions(response.data);
      fetchRandomCurrency();
    } catch (error) {
      console.error('Error fetching currency options:', error);
    }
  };

  const fetchRandomCurrency = () => {
    const codes = Object.keys(currencyOptions);
    const randomIndex = Math.floor(Math.random() * codes.length);
    const randomCurrencyCode = codes[randomIndex];
    setCurrentCurrency({
      code: randomCurrencyCode,
      name: currencyOptions[randomCurrencyCode],
    });
  };

  const handleGenerateRandomCurrency = () => {
    fetchRandomCurrency();
  };

  return (
    <div className="currency-container">
      <h2 className="currency-header">Random Currency</h2>
      {currentCurrency && (
        <div className="currency-details">
          <p><strong>Code:</strong> {currentCurrency.code}</p>
          <p><strong>Name:</strong> {currentCurrency.name}</p>
        </div>
      )}
      <button className="generate-button" onClick={handleGenerateRandomCurrency}>Generate Random Currency</button>
    </div>
  );
};

export default CurrencyQuote;
