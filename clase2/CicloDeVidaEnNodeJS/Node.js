console.log("Inicio del script");

// Se agenda una tarea para el siguiente tick del event loop
process.nextTick(() => {
  console.log("Ejecutado en process.nextTick");
});

// Tarea que se ejecuta después de 0 ms
setTimeout(() => {
  console.log("Ejecutado en setTimeout");
}, 800);

// Tarea inmediata tras finalizar el poll phase
setImmediate(() => {
  console.log("Ejecutado en setImmediate");
});

console.log("Fin del script");
