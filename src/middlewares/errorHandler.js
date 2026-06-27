const logger = require('../utils/logger');

// Middleware de tratamento de erros global
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  logger.error(`[${req.method} ${req.path}] ${status} - ${message}`, err);

  res.status(status).json({
    erro: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Middleware para capturar rotas não encontradas
const notFound = (req, res, next) => {
  const erro = new Error(`Rota não encontrada: ${req.originalUrl}`);
  erro.status = 404;
  next(erro);
};

module.exports = { errorHandler, notFound };
