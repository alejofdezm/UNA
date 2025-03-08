import { add } from "./math";

test("Suma dos números correctamente", () => {
  expect(add(2, 3)).toBe(5);
});

test("Suma dos números Resultdo Incorrecto", () => {
    expect(add(2, 8)).toBe(10);
  });