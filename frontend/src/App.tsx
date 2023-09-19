import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValueN, setInputValueN] = useState<string>("");
  const [result, setResult] = useState<(number | string)[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to perform frontend validation for invalid input
  const validateInput = () => {
    const inputNValue = parseInt(inputValueN);
    if (isNaN(inputNValue) || inputNValue < 2) {
      setError("Input must be a valid number greater than or equal to 2");
    } else if (inputNValue >= 1000000) {
      setError("Input must be lesser than 1 million");
    } else {
      return true;
    }
    setResult([]);
    return false;
  };

  const handleCalculate = async () => {
    if (!validateInput()) {
      return; // Exit the function early if validation fails (before making the GET request)
    }
    // Skipping the backend call for this case too
    if (inputValueN === "2") {
      setError(null);
      setResult(["No median available for the given input"]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/median-primes?n=${inputValueN}`
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        setResult([]);
      } else {
        setResult(data.medianPrimes);
        setError(null);
      }
    } catch (error: any) {
      setResult([]);
      setError(error.message || "An error occured!");
    }
  };

  return (
    <>
      <h1>Median Prime Number Calculator</h1>
      <div className="input-container">
        <label htmlFor="numberInput">Please enter a number to calculate:</label>
        <input
          id="numberInput"
          type="number"
          value={inputValueN}
          onChange={(e) => setInputValueN(e.target.value)}
        />
      </div>
      <button className="calculate-button" onClick={handleCalculate}>
        Calculate
      </button>
      {result.length > 0 &&
        result[0] === "No median available for the given input" && (
          <div className="result">
            <p>{result[0]}</p>
          </div>
        )}
      {result.length > 0 &&
        result[0] !== "No median available for the given input" && (
          <div className="result">
            <p>
              The Median Prime(s) for the given input are: {result.join(", ")}
            </p>
          </div>
        )}
      {result.length === 0 && error && <div className="error">{error}</div>}
    </>
  );
}

export default App;
