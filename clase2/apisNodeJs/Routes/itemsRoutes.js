const express = require('express');
const router = express.Router();
const itemsController = require('../Controller/itemsController');

// Define la ruta GET para obtener items
router.get('/items', itemsController.getItems);

// Define la ruta POST para crear un nuevo item
router.post('/items', itemsController.createItem);

router.get('/itemserror', itemsController.getItemsError);


module.exports = router;
