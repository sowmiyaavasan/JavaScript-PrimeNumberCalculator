function calculateMedianPrimes(n) {
  const Primes = new Array(n).fill(true);

  // Sieve of Eratosthenes algorithm to mark non-prime numbers
  for (let i = 2; i * i <= n; i++) {
    if (Primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        Primes[j] = false;
      }
    }
  }

  const primeNumbers = [];
  for (let i = 2; i < n; i++) {
    if (Primes[i]) {
      primeNumbers.push(i);
    }
  }

  // Median calculation
  const result = [];
  for (let i = 0; i < primeNumbers.length; i++) {
    if (i === 0 && primeNumbers.length % 2 === 1) {
      result.push(primeNumbers[Math.floor(primeNumbers.length / 2)]);
    } else if (i === primeNumbers.length - 1 && primeNumbers.length % 2 === 0) {
      result.push(
        primeNumbers[primeNumbers.length / 2 - 1],
        primeNumbers[primeNumbers.length / 2]
      );
    }
  }

  return result;
}

module.exports = { calculateMedianPrimes };
