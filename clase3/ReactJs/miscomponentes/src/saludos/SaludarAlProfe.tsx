import React, { useState } from "react";

export const SaludarAlProfe = () => {
  const [mensaje, setMensaje] = useState("Hola profe");
  return (
    <div>
      <h1>{mensaje}</h1>

      <input type='text' onChange={(e) => setMensaje(e.target.value)} />
    </div>
  );
};
