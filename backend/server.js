const express = require("express");
const cors = require("cors");
const { calculateMedianPrimes } = require("./primeMedianCalculator");

const app = express();
const port = 3001;

app.use(cors());

app.get("/median-primes", (req, res) => {
  const { n } = req.query;
  const inputN = parseInt(n);
  if (isNaN(inputN) || inputN < 2) {
    res.status(400).json({
      error: "Input must be a valid number greater than or equal to 2",
    });
  } else if (inputN >= 1000000) {
    res.status(400).json({
      error: "Input must be lesser than 1 million",
    });
  } else {
    const result = calculateMedianPrimes(inputN);
    res.json({ medianPrimes: result });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
