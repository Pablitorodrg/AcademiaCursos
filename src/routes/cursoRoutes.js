const express = require('express');
const router = express.Router();
console.log('cursoRoutes.js cargado y router inicializado.');
const cursoController = require('../controllers/cursoController');

// Definición de las rutas del CRUD
router.get('/', cursoController.listarCursos);
router.post('/', cursoController.agregarCurso);
router.put('/:id', cursoController.modificarCurso);
router.delete('/:id', cursoController.borrarCurso);

module.exports = router;