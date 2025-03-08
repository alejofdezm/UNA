export const fetchSalario = async (userId:string) => {
    const response = await fetch(`https://api.ejemplo.com/salario/${userId}`);
    if (!response.ok) throw new Error("Error al obtener el salario");
    return response.json();
  };
  
  export const fetchImpuesto = async () => {
    const response = await fetch(`https://api.ejemplo.com/impuesto`);
    if (!response.ok) throw new Error("Error al obtener el impuesto");
    return response.json();
  };
  
  export const calcularImpuestoSalario = async (userId:string) => {
    const salarioData = await fetchSalario(userId);
    const impuestoData = await fetchImpuesto();
  
    const salario = salarioData.salario;
    const impuesto = impuestoData.porcentaje; // Porcentaje de impuesto (ej. 10%)
  
    return salario * (impuesto / 100); // Calcula el impuesto
  };
  