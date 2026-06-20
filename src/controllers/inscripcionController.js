const { insertarInscripcion, insertarPreinscripcion } = require('../models/inscripcionModel');

const manejarPreinscripcion = async (req, res) => {
    try {
        const { curso_select, nombre, apellido, whatsapp } = req.body;
        if (!curso_select || !nombre || !apellido || !whatsapp) {
            return res.status(200).json({
                success: false,
                error: 'Faltan campos obligatorios: curso_select, nombre, apellido, whatsapp'
            });
        }
        const resultado = await insertarPreinscripcion(req.body);
        return res.status(200).json({ success: true, datos: resultado });
    } catch (error) {
        console.error('Error en manejarPreinscripcion:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const manejarInscripcion = async (req, res) => {
    try {
        const { curso_select, nombre, apellido, whatsapp, cedula, correo, grado_instruccion, referencia, monto, edad, fecha_nacimiento, experiencia } = req.body;
        if (!curso_select || !nombre || !apellido || !whatsapp || !cedula || !correo || !grado_instruccion || !referencia || !monto || !edad || !fecha_nacimiento || !experiencia) {
            return res.status(200).json({
                success: false,
                error: 'Faltan campos obligatorios: curso_select, nombre, apellido, whatsapp, cedula, correo, grado_instruccion, referencia, monto, edad, fecha_nacimiento, experiencia'
            });
        }
        const edadNum = parseInt(edad, 10);
        if (isNaN(edadNum) || edadNum < 1 || edadNum > 120) {
            return res.status(200).json({ success: false, error: 'Edad inválida. Debe ser un número entre 1 y 120.' });
        }
        req.body.edad = edadNum;
        function parseMonto(str) {
            let s = String(str).replace(/[^0-9,.]/g, '');
            const ultComa = s.lastIndexOf(',');
            const ultPunto = s.lastIndexOf('.');
            if (ultComa === -1 && ultPunto === -1) return parseFloat(s);
            const sepDec = ultComa > ultPunto ? ',' : '.';
            const idxDec = sepDec === ',' ? ultComa : ultPunto;
            const intPart = s.substring(0, idxDec).replace(/[^0-9]/g, '');
            const decPart = s.substring(idxDec + 1).replace(/[^0-9]/g, '');
            return parseFloat(intPart + '.' + decPart);
        }
        const montoLimpio = parseMonto(monto);
        if (isNaN(montoLimpio)) {
            return res.status(200).json({ success: false, error: 'Monto inválido. Debe ser un número.' });
        }
        req.body.monto = montoLimpio.toFixed(2);
        const resultado = await insertarInscripcion(req.body);
        return res.status(200).json({ success: true, datos: resultado });
    } catch (error) {
        console.error('Error en manejarInscripcion:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { manejarPreinscripcion, manejarInscripcion };
