const fsPromises = require('fs').promises;
const path = require('path');
const folderPath = './archivosdemo';

fsPromises.readdir(folderPath)
  .then(files => {
    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      fsPromises.readFile(filePath, 'utf8')
        .then(data => {

          console.log(`Contenido de ${file}:`, data);
          
        })
        .catch(err => {
          console.error(`Error al leer el archivo ${file}:`, err);
        });
    });
  })
  .catch(err => {
    console.error('Error al leer el directorio:', err);
  });
