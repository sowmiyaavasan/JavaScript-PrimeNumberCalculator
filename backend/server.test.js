const request = require("supertest");
const app = require("./server");

describe("GET /median-primes", () => {
  it("calculates median primes for a valid input", async () => {
    const response = await request(app).get("/median-primes?n=10");
    expect(response.status).toBe(200);
    expect(response.body.medianPrimes).toEqual([3, 5]);
  });

  it("returns an error for an invalid input", async () => {
    const response = await request(app).get("/median-primes?n=-5");
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Input must be a valid number greater than or equal to 2"
    );
  });
});
