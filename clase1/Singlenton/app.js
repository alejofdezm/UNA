const db1 = require('./database');
const db2 = require('./database');

console.log("Conexión:", db1.getConnection());
console.log(db1 === db2 ? 'Singleton funciona correctamente' : 'Error en Singleton');
