require('dotenv').config();
const { app } = require('./app');
const conectarBanco = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

conectarBanco().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}).catch((erro) => {
  logger.error('Erro ao conectar ao banco de dados:', erro);
  process.exit(1);
});
