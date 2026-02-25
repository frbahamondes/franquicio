// server.js
// Punto de entrada de la aplicación
// Solo se encarga de levantar el servidor en el puerto indicado

import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});