const express = require('express');
const router = express.Router();
const { manejarPreinscripcion, manejarInscripcion } = require('../controllers/inscripcionController');

router.post('/inscripciones', manejarInscripcion);
router.post('/preinscripciones', manejarPreinscripcion);

module.exports = router;
