import React, { useEffect, useState } from "react";

const initialStocks = [
  {
    ticker: "RELIANCE",
    name: "Reliance Industries",
    price: 2850.0,
    interval: 1000,
  },
  {
    ticker: "TCS",
    name: "Tata Consultancy Services",
    price: 3850.0,
    interval: 2000,
  },
  {
    ticker: "INFY",
    name: "Infosys",
    price: 1440.0,
    interval: 3500,
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank",
    price: 1550.0,
    interval: 1500,
  },
  {
    ticker: "ICICIBANK",
    name: "ICICI Bank",
    price: 1120.0,
    interval: 5500,
  },
  {
    ticker: "HINDUNILVR",
    name: "Hindustan Unilever",
    price: 2300.0,
    interval: 6500,
  },
  {
    ticker: "SBIN",
    name: "State Bank of India",
    price: 760.0,
    interval: 6500,
  },
  {
    ticker: "LT",
    name: "Larsen & Toubro",
    price: 3550.0,
    interval: 6500,
  },
  {
    ticker: "ITC",
    name: "ITC Ltd",
    price: 440.0,
    interval: 6500,
  },
  {
    ticker: "BHARTIARTL",
    name: "Bharti Airtel",
    price: 1325.0,
    interval: 6500,
  },
];

const StockApp = () => {
  const [stocks, setStocks] = useState(initialStocks);
  const [wishlisted, setWishlisted] = useState([]);

  useEffect(() => {
    const intervals = stocks.map((stock, index) => {
      return setInterval(() => {
        setStocks((prevStocks) =>
          prevStocks.map((s, i) =>
            i === index
              ? {
                  ...s,
                  price: parseFloat(
                    (s.price + (Math.random() * 10 - 5)).toFixed(2)
                  ),
                }
              : s
          )
        );
      }, stock.interval);
    });

    // Clean up intervals on unmount
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleWishlist = (index) => {
    setWishlisted((prev) => [...prev, index]);
  };

  console.log(wishlisted);

  return (
    <>
      <div className="container">
        {stocks.map((ticker, index) => (
          <div
            key={ticker.ticker}
            className="search-options-container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "40px",
              marginBottom: "10px",
            }}
          >
            <div style={{ width: "150px" }}>{ticker.name}</div>
            <div className="price">₹{ticker.price.toFixed(2)}</div>
            <button onClick={() => handleWishlist(index)}>Add</button>
          </div>
        ))}
      </div>
      <h1>Wishlist</h1>
      <div className="wishlist">
        {wishlisted.map((stockIndex, index) => {
          return (
            <div
              className="search-options-container"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "40px",
                marginBottom: "10px",
              }}
            >
              <div style={{ width: "150px" }}>{stocks[stockIndex].name}</div>
              <div className="price">
                ₹{stocks[stockIndex].price.toFixed(2)}
              </div>
              <button onClick={() => handleWishlist(index)}>Add</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StockApp;
