import {  calcularImpuestoSalario } from "./calcularImpuesto";

// Mock global de fetch
global.fetch = jest.fn();

describe("Pruebas de calcularImpuestoSalario", () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test("Debe calcular correctamente el impuesto sobre el salario", async () => {
    // Mock de la API de salario
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salario: 5000 }),
      })
    );

    // Mock de la API de impuesto
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ porcentaje: 10 }), // 10% de impuesto
      })
    );

    const impuestoCalculado = await calcularImpuestoSalario(1);

    expect(fetch).toHaveBeenCalledTimes(2); // Se llamaron las dos APIs
    expect(impuestoCalculado).toBe(500); // 5000 * 10% = 500
  });

  test("Debe manejar error cuando la API de salario falla", async () => {
    // Simulamos error en la API de salario
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    await expect(calcularImpuestoSalario(1)).rejects.toThrow("Error al obtener el salario");
  });

  test("Debe manejar error cuando la API de impuesto falla", async () => {
    // Mock de la API de salario correcto
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salario: 5000 }),
      })
    );

    // Simulamos error en la API de impuesto
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    await expect(calcularImpuestoSalario(1)).rejects.toThrow("Error al obtener el impuesto");
  });

  test("Debe calcular correctamente con otro porcentaje de impuesto", async () => {
    // Mock de la API de salario con un salario diferente
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ salario: 3000 }),
      })
    );

    // Mock de la API de impuesto con 15%
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ porcentaje: 15 }),
      })
    );

    const impuestoCalculado = await calcularImpuestoSalario(1);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(impuestoCalculado).toBe(450); // 3000 * 15% = 450
  });

});
