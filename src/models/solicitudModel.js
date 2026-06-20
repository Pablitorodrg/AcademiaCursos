const pool = require('../database/conexion'); // Asegúrate de que esta ruta a tu conexión de BD sea la correcta

const solicitudModel = {
    
    // 1. MODELO PARA PREINSCRIPCIÓN (4 campos básicos)
    crearPreinscripcion: async (datos) => {
        try {
            const query = `
                INSERT INTO preinscripciones (
                    curso_select, 
                    nombre, 
                    apellido, 
                    whatsapp
                )
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;

            const values = [
                datos.curso_select,
                datos.nombre,
                datos.apellido,
                datos.whatsapp
            ];

            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error("Error en solicitudModel (crearPreinscripcion):", error);
            throw error;
        }
    },

    // 2. MODELO PARA INSCRIPCIÓN COMPLETA (11 campos requeridos)
    crearInscripcionCompleta: async (datos) => {
        try {
            const query = `
                INSERT INTO inscripciones (
                    curso_select, 
                    nombre, 
                    apellido, 
                    whatsapp, 
                    cedula, 
                    correo, 
                    grado_instruccion, 
                    trabaja_actualmente, 
                    direccion_habitacion, 
                    condicion_fisica_cognitiva, 
                    comprobante_pago
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *;
            `;

            const values = [
                datos.curso_select,
                datos.nombre,
                datos.apellido,
                datos.whatsapp,
                datos.cedula,
                datos.correo,
                datos.grado_instruccion,
                datos.trabaja_actualmente,
                datos.direccion_habitacion,
                datos.condicion_fisica_cognitiva,
                datos.comprobante_pago
            ];

            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error("Error en solicitudModel (crearInscripcionCompleta):", error);
            throw error; // Envía el error al controlador para que Postman lo muestre
        }
    }
};


module.exports = solicitudModel;