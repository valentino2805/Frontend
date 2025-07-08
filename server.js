const express = require('express');
const path = require('path');
const app = express();

// Puerto proporcionado por Railway u 8080 como fallback
const port = process.env.PORT || 8080;

// Reemplaza esto con el nombre de tu proyecto compilado
const distFolder = path.join(__dirname, 'dist/stadistics-bounded-context');

// Servir archivos estáticos desde la carpeta de producción
app.use(express.static(distFolder));

// Redirigir todas las rutas al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
