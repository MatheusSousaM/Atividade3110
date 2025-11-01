const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router('db.json'); // Aponta para o "banco de dados"
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// 1. Servir a pasta 'public' (onde está o HTML, CSS e JS)
app.use(express.static(path.join(__dirname, 'public')));

// 2. Usar middlewares do json-server
app.use(middlewares);

// 3. Definir a rota da API (ex: /api/pessoas)
app.use('/api', router);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});