const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} corriendo`);

  // Crear un worker por cada núcleo
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} finalizó`);
  });
} else {
  // Código del worker: se crea un servidor HTTP
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hola desde el worker ' + process.pid);
  }).listen(3000);

  console.log(`Worker ${process.pid} iniciado`);
}