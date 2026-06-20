const pool = require('../database/conexion');

const insertarPreinscripcion = async (datos) => {
    const query = `
        INSERT INTO preinscripciones (curso_select, nombre, apellido, whatsapp)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [datos.curso_select, datos.nombre, datos.apellido, datos.whatsapp];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const insertarInscripcion = async (datos) => {
    const query = `
        INSERT INTO inscripciones (
            curso_select, nombre, apellido, whatsapp, cedula, correo,
            grado_instruccion, trabaja_actualmente, direccion_habitacion,
            condicion_fisica_cognitiva, referencia, monto,
            edad, fecha_nacimiento, experiencia
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *;
    `;
    const values = [
        datos.curso_select, datos.nombre, datos.apellido, datos.whatsapp,
        datos.cedula, datos.correo, datos.grado_instruccion,
        datos.trabaja_actualmente, datos.direccion_habitacion,
        datos.condicion_fisica_cognitiva, datos.referencia, datos.monto,
        datos.edad, datos.fecha_nacimiento, datos.experiencia
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

module.exports = { insertarPreinscripcion, insertarInscripcion };
