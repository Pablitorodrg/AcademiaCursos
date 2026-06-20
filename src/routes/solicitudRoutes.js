const express = require('express');
const router = express.Router();
const SolicitudController = require('../controllers/solicitudController');
const db = require('../database/conexion'); // Asegúrate de tener tu conexión a mano

// Ruta para Registrar (POST)
router.post('/', SolicitudController.registrar);

// NUEVAS RUTAS GET PARA VISUALIZACIÓN
router.get('/inscripciones', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT ROW_NUMBER() OVER (ORDER BY id ASC) as num, * FROM inscripciones ORDER BY fecha_registro DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/preinscripciones', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT ROW_NUMBER() OVER (ORDER BY id ASC) as num, * FROM preinscripciones ORDER BY fecha_registro DESC');
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// CONTROL DE PROCESO (Switch de PREINSCRIPCION / INSCRIPCION)
router.get('/proceso-actual', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT proceso_actual FROM control_procesos WHERE id = 1");
        if (rows.length === 0) return res.status(404).json({ error: 'No hay registro de proceso' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/cambiar-proceso', async (req, res) => {
    try {
        const { nuevoEstado } = req.body;
        if (!['PREINSCRIPCION', 'INSCRIPCION'].includes(nuevoEstado)) {
            return res.status(400).json({ error: 'Estado inválido' });
        }
        await db.query("UPDATE control_procesos SET proceso_actual = $1 WHERE id = 1", [nuevoEstado]);
        res.json({ mensaje: `Proceso cambiado a ${nuevoEstado}` });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;