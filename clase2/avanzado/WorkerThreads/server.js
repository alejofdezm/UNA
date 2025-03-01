const { Worker } = require('worker_threads');

const worker = new Worker('./worker.js');
worker.on('message', result => {
  console.log('Resultado del cálculo intensivo:', result);
});
worker.on('error', error => {
  console.error('Error en el worker:', error);
});
