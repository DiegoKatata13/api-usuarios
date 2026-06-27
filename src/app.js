const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware de body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de requisições
app.use((req, res, next) => {
  logger.debug(`[${req.method}] ${req.path}`);
  next();
});

// Rate Limiting - geral
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test',
});

// Rate Limiting - endpoints sensíveis
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // máximo 5 tentativas de login por IP
  message: 'Muitas tentativas de login, tente novamente em 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test',
});

// Aplicar rate limiting
app.use(limiter);

// Rotas
app.use('/auth', require('./routes/authRoutes'));
app.use('/usuarios', require('./routes/usuarioRoutes'));

// Rota raiz para confirmar que a API está no ar
app.get('/', (req, res) => {
  res.json({ 
    mensagem: '🚀 API de Usuários funcionando!',
    versao: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Middleware para capturar rotas não encontradas
app.use(notFound);

// Middleware de tratamento de erros global (deve ser último)
app.use(errorHandler);

module.exports = { app, loginLimiter };
