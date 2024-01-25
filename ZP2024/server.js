import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Nastavenie statického priečinka pre súbory
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    console.log(__dirname);
res.sendFile(__dirname + '/index.html');

  });

app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});
