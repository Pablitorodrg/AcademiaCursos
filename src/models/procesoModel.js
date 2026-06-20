const pool = require('../database/conexion');

const procesoModel = {
    // Obtener si el coordinador configuró 'PREINSCRIPCIÓN' o 'INSCRIPCIÓN'
    obtenerActivo: async () => {
        try {
            const consulta = 'SELECT proceso_actual FROM control_procesos WHERE id = 1;';
            const resultado = await pool.query(consulta);
            return resultado.rows[0]; // Devuelve { proceso_actual: '...' }
        } catch (error) {
            throw new Error('Error al obtener el proceso activo: ' + error.message);
        }
    }
};

module.exports = procesoModel;