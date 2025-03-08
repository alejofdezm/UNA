import { isValidEmail } from "./validators";

describe("Pruebas de la función isValidEmail", () => {
  
  test("Debe retornar true para un email válido", () => {
    expect(isValidEmail("correo@example.com")).toBe(true);
  });

  test("Debe retornar false para un email sin @", () => {
    expect(isValidEmail("correoexample.com")).toBe(false);
  });

  test("Debe retornar false para un email sin dominio", () => {
    expect(isValidEmail("correo@.com")).toBe(false);
  });

  test("Debe retornar false para un email con espacios", () => {
    expect(isValidEmail("correo @example.com")).toBe(false);
  });

  test("Debe retornar false para un email vacío", () => {
    expect(isValidEmail("")).toBe(false);
  });

  test("Debe retornar false si el input no es un string", () => {
    expect(isValidEmail(12345)).toBe(false);
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
  });
});
