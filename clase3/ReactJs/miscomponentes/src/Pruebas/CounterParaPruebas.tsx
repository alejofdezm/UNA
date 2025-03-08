import React, { useState } from "react";

const CounterParaPruebas = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 data-testid='counter-value'>{count}</h1>
      <button data-testid='increase-btn' onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <button data-testid='decrease-btn' onClick={() => setCount(count - 1)}>
        Decrementar
      </button>
    </div>
  );
};

export default CounterParaPruebas;
