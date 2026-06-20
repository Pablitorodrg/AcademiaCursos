const CursoModel = require('../models/cursoModel');

const cursoController = {
    // GET /api/cursos
    listarCursos: async (req, res) => {
        try {
            const cursos = await CursoModel.obtenerTodos();
            return res.status(200).json(cursos);
        } catch (error) {
            return res.status(500).json({ error: 'Error al obtener los cursos.', detalle: error.message });
        }
    },

    // POST /api/cursos
    agregarCurso: async (req, res) => {
        try {
            const nombre = req.body.nombre?.trim();
            const area = req.body.area?.trim();

            if (!nombre || !area) {
                return res.status(400).json({ error: 'El nombre y el área son campos obligatorios.' });
            }

            const existente = await CursoModel.buscarPorNombre(nombre);
            if (existente) {
                return res.status(409).json({ error: 'Ya existe un curso con ese nombre.' });
            }

            const nuevoCurso = await CursoModel.crear({ nombre, area });
            return res.status(201).json({
                mensaje: '¡Curso agregado con éxito!',
                datos: nuevoCurso
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al crear el curso.', detalle: error.message });
        }
    },

    // PUT /api/cursos/:id
    modificarCurso: async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, area } = req.body;

            if (!nombre || !area) {
                return res.status(400).json({ error: 'El nombre y el área son obligatorios para actualizar.' });
            }

            const cursoEditado = await CursoModel.actualizar(id, { nombre, area });

            if (!cursoEditado) {
                return res.status(404).json({ error: 'El curso que intentas modificar no existe.' });
            }

            return res.status(200).json({
                mensaje: '¡Curso modificado con éxito!',
                datos: cursoEditado
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al modificar el curso.', detalle: error.message });
        }
    },

    // DELETE /api/cursos/:id
    borrarCurso: async (req, res) => {
        try {
            const { id } = req.params;
            const cursoEliminado = await CursoModel.eliminar(id);

            if (!cursoEliminado) {
                return res.status(404).json({ error: 'El curso que intentas eliminar no existe.' });
            }

            return res.status(200).json({
                mensaje: '¡Curso eliminado de raíz correctamente!',
                datos: cursoEliminado
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error al eliminar el curso.', detalle: error.message });
        }
    }
};

module.exports = cursoController;