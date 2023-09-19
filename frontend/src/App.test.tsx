import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  // TEST 1 - checking the UI
  it("renders the App component", () => {
    const { getByText, getByLabelText } = render(<App />);
    const headerElement = getByText("Median Prime Number Calculator");
    const inputElement = getByLabelText("Please enter a number to calculate:");
    const calculateButton = getByText("Calculate");

    expect(headerElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });

  // TEST 2 - Checking the valid input flow
  it("handles successful calculation", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        medianPrimes: [2, 3, 5, 7],
      }),
      ok: true,
    } as Response);
    const { getByText, getByLabelText, findByText } = render(<App />);
    const inputElement = getByLabelText("Please enter a number to calculate:");
    const calculateButton = getByText("Calculate");
    fireEvent.change(inputElement, { target: { value: "10" } });
    fireEvent.click(calculateButton);
    await waitFor(() => {
      const resultElement = getByText(
        "The Median Prime(s) for the given input are: 2, 3, 5, 7"
      );
      expect(resultElement).toBeInTheDocument();
    });
  });

  // TEST 3 - Checking the error for invalid input flow
  it("handles calculation error", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      status: 500,
      ok: false,
    } as Response);
    const { getByText, getByLabelText, findByText } = render(<App />);
    const inputElement = getByLabelText("Please enter a number to calculate:");
    const calculateButton = getByText("Calculate");
    fireEvent.change(inputElement, { target: { value: "-5" } });
    fireEvent.click(calculateButton);
    await waitFor(() => {
      const errorElement = getByText(
        "Input must be a valid number greater than or equal to 2"
      );
      expect(errorElement).toBeInTheDocument();
    });
  });

  // TEST 4 - Checking the response for input = 2
  it("handles input value of 2", async () => {
    const { getByText, getByLabelText } = render(<App />);
    const inputElement = getByLabelText("Please enter a number to calculate:");
    const calculateButton = getByText("Calculate");
    fireEvent.change(inputElement, { target: { value: "2" } });
    fireEvent.click(calculateButton);
    await waitFor(() => {
      const resultElement = getByText(
        "No median available for the given input"
      );
      expect(resultElement).toBeInTheDocument();
    });
  });

  // TEST 5 - Checking frontend validation for invalid input
  it("handles frontend validation for invalid input", async () => {
    const { getByText, getByLabelText } = render(<App />);
    const inputElement = getByLabelText("Please enter a number to calculate:");
    const calculateButton = getByText("Calculate");
    fireEvent.change(inputElement, { target: { value: "-5" } });
    fireEvent.click(calculateButton);
    await waitFor(() => {
      const errorElement = getByText(
        "Input must be a valid number greater than or equal to 2"
      );
      expect(errorElement).toBeInTheDocument();
    });
  });
});
