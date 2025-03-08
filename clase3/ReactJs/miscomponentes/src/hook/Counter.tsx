import React, { useState, useEffect } from "react";

// Hook personalizado para manejar un contador
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  return { count, increment };
};

// Componente que usa el hook personalizado
const Counter = () => {
  const { count, increment } = useCounter(0);

  // useEffect para mostrar el valor actualizado en consola cada vez que cambie
  useEffect(() => {
    console.log("Contador actualizado:", count);
  }, [count]);

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
};

export default Counter;
