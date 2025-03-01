require('dotenv').config();

const fs = require('fs');
const path = require('path');
const csvFilePath = path.join(__dirname, process.env.CSV_FILE);

// Si el archivo no existe, se crea con un encabezado
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, 'id,nombre,apellidos\n', 'utf8');
}

const getItems = (req, res) => {
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo CSV:', err);
      return res.status(500).json({ message: 'Error al leer el archivo CSV' });
    }
    const lines = data.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return res.json([]);
    const headers = lines[0].split(',');
    const items = lines.slice(1).map(line => {
      const values = line.split(',');
      let item = {};
      headers.forEach((header, index) => {
        item[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return item;
    });
    res.json(items);
  });
};

const createItem = (req, res) => {
  const { id, nombre, apellidos } = req.body;
  if (!id || !nombre || !apellidos) {
    return res.status(400).json({ message: 'Se deben enviar id, nombre y apellidos' });
  }
  const csvLine = `${id},${nombre},${apellidos}\n`;
  fs.appendFile(csvFilePath, csvLine, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir en el archivo CSV:', err);
      return res.status(500).json({ message: 'Error al guardar el item' });
    }
    res.status(201).json({ message: 'Item creado y guardado en CSV', data: req.body });
  });
};


const getItemsError = (req, res, next) => {
  // Forzamos un error para probar el middleware de errores
  return next(new Error('Error forzado para probar manejo de errores'));
};

module.exports = {
  getItems,
  getItemsError,
  createItem
};
