// worker.js: Código que se ejecutará en el worker thread
const { parentPort } = require('worker_threads');

// Simulamos una tarea intensiva
const computeFibonacci = (n) => {
  if (n < 2) return n;
  return computeFibonacci(n - 1) + computeFibonacci(n - 2);
};

// Ejecutamos el cálculo y enviamos el resultado al hilo principal
const result = computeFibonacci(45);
parentPort.postMessage(result);
