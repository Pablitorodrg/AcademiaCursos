const db = require('../database/conexion');

const CursoModel = {
    // 1. Obtener todos los cursos
    obtenerTodos: async () => {
        // Cambiamos 'categoria' por 'area'
        const query = 'SELECT * FROM cursos ORDER BY area, nombre ASC;';
        const { rows } = await db.query(query);
        return rows;
    },

    // 1.5 Buscar curso por nombre (evitar duplicados)
    buscarPorNombre: async (nombre) => {
        const query = 'SELECT id FROM cursos WHERE LOWER(nombre) = LOWER($1);';
        const { rows } = await db.query(query, [nombre]);
        return rows[0];
    },

    // 2. Crear un nuevo curso
    crear: async (datosCurso) => {
        // Asegúrate de que el frontend envíe 'area' en lugar de 'categoria'
        const { nombre, area } = datosCurso; 
        const query = `
            INSERT INTO cursos (nombre, area) 
            VALUES ($1, $2) 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nombre, area]);
        return rows[0];
    },

    // 3. Modificar un curso existente
    actualizar: async (id, datosCurso) => {
        const { nombre, area } = datosCurso;
        const query = `
            UPDATE cursos 
            SET nombre = $1, area = $2 
            WHERE id = $3 
            RETURNING *;
        `;
        const { rows } = await db.query(query, [nombre, area, id]);
        return rows[0];
    },

    // 4. Eliminar un curso de raíz
    eliminar: async (id) => {
        const query = 'DELETE FROM cursos WHERE id = $1 RETURNING *;';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    }
};

// ... código anterior de CursoModel
module.exports = CursoModel;