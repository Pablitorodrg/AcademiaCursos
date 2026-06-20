require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors'); // Mecanismo de seguridad para permitir peticiones desde el frontend
const path = require('path');


// IMPORTACIÓN DE LAS RUTAS SEPARADAS (Mismo orden que tu modelo)
const solicitudRoutes = require('./routes/solicitudRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');


process.on('uncaughtException', (err) => console.error('Excepción no capturada:', err.message));
process.on('unhandledRejection', (err) => console.error('Promesa rechazada:', err.message));

// MIDDLEWARES (Configuraciones obligatorias)
app.use(cors());         // Activa la seguridad CORS para tus peticiones HTTP (1º para preflight)
app.use(express.json()); // Para entender JSON en el cuerpo de las peticiones
app.use(express.urlencoded({ extended: true }));

// Servir tu interfaz HTML, CSS y JS dinámico desde la carpeta Public
app.use(express.static(path.join(__dirname, '../Public')));
// También responder a rutas con prefijo /Public/ (compatibilidad con enlaces antiguos)
app.use('/Public', express.static(path.join(__dirname, '../Public')));

// RUTA INICIAL DE PRUEBA (Igual a tu "Hola Mundo", pero ideal para tu web)
app.get('/', (req, res) => {
    res.send("Servidor de Cursos La Villa Activo y Corriendo 🚀");
});

// ASIGNACIÓN DE LAS RUTAS (Tus caminos limpios de la API)
app.use("/solicitudes", solicitudRoutes);
app.use("/cursos", cursoRoutes);
app.use("/api", inscripcionRoutes);





// ENCENDIDO DEL MOTOR
app.listen(4000, () => {
    console.log('Servidor de Cursos La Villa activo en el puerto 4000   🚀');
});