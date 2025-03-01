const fs = require('fs');
const path = require('path');
const folderPath = './archivosdemo';

fs.readdir(folderPath, (err, files) => {
  if (err) {
    return console.error('Error al leer el directorio:', err);
  }
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo ${file}:`, err);
      } else {
        console.log(`Contenido de ${file}:`, data);
      }
    });
  });
});
