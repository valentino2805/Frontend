import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

const distFolder = path.join(__dirname, 'dist/stadistics-bounded-context');
app.use(express.static(distFolder));

app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
