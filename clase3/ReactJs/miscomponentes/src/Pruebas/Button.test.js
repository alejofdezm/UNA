// Button.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("Ejecuta onClick cuando se hace clic", () => {
  const handleClick = jest.fn(); // Mock de la función
  render(<Button onClick={handleClick} />);

  const button = screen.getByTestId("custom-button");
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
