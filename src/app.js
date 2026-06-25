const express = require('express');
const app = express();

app.use(express.json());

// Rotas
app.use('/auth', require('./routes/authRoutes'));
app.use('/usuarios', require('./routes/usuarioRoutes'));

// Rota raiz para confirmar que a API está no ar
app.get('/', (req, res) => {
  res.json({ mensagem: '🚀 API de Usuários funcionando!' });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

module.exports = app;
