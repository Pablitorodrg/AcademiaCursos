const solicitudModel = require('../models/solicitudModel');
const procesoModel = require('../models/procesoModel');

const solicitudController = {
    registrar: async (req, res) => {
        try {
            // 1. Llama al modelo del Paso 1 para ver el switch de la base de datos
            const control = await procesoModel.obtenerActivo();

            if (!control) {
                return res.status(500).json({ error: 'No se encontró la configuración del proceso en la base de datos.' });
            }

            // 2. Si el switch dice PREINSCRIPCIÓN -> Guarda en la tabla preinscripciones
            if (control.proceso_actual === 'PREINSCRIPCION') {
                const nuevaPre = await solicitudModel.crearPreinscripcion(req.body);
                return res.status(201).json({
                    mensaje: '¡Preinscripción registrada con éxito en la tabla preinscripciones!',
                    datos: nuevaPre
                });
            } 
            
          // 3. CASO: INSCRIPCION (CORREGIDO: Sin tilde para que coincida con tu BD)
            else if (control.proceso_actual === 'INSCRIPCION') { //
                // Validamos que vengan los campos obligatorios para la inscripción completa antes de insertar
                const { cedula, correo, grado_instruccion, comprobante_pago } = req.body; //
                
                if (!cedula || !correo || !grado_instruccion || !comprobante_pago) {
                    return res.status(400).json({
                        error: 'Faltan campos requeridos para procesar la inscripción formal.',
                        campos_necesarios: ['cedula', 'correo', 'grado_instruccion', 'comprobante_pago']
                    });
                }

                const nuevaInscripcion = await solicitudModel.crearInscripcionCompleta(req.body); //
                return res.status(201).json({
                    mensaje: '¡Inscripción formal registrada con éxito en la tabla inscripciones!',
                    datos: nuevaInscripcion
                }); //
            } 

            // 4. SEGURO: Si el valor de la BD no coincide con ninguno de los bloques anteriores
            else {
                return res.status(400).json({
                    error: 'El estado del proceso actual en la base de datos no es válido.',
                    valor_encontrado: control.proceso_actual
                });
            }

        } catch (error) {
            console.error('Error en el controlador de solicitudes:', error); //
            return res.status(500).json({ 
                error: 'Error interno del servidor al procesar la solicitud.',
                detalle: error.message 
            }); //
        }
    }
};

module.exports = solicitudController; // Exporta el controlador para que pueda ser utilizado en otras partes de la aplicación