import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./CounterParaPruebas";

describe("Counter Component", () => {
  
  test("Debe renderizar correctamente el contador inicial en 0", () => {
    render(<Counter />);
    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("0");
  });

  test("Debe incrementar el contador al hacer clic en el botón de incrementar", () => {
    render(<Counter />);
    const counterValue = screen.getByTestId("counter-value");
    const incrementButton = screen.getByTestId("increase-btn");

    fireEvent.click(incrementButton);

    expect(counterValue).toHaveTextContent("1");
  });

  test("Debe decrementar el contador al hacer clic en el botón de decrementar", () => {
    render(<Counter />);
    const counterValue = screen.getByTestId("counter-value");
    const decrementButton = screen.getByTestId("decrease-btn");

    fireEvent.click(decrementButton);

    expect(counterValue).toHaveTextContent("-1");
  });
});
