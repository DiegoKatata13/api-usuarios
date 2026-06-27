const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { registrar, login } = require('../controllers/authController');
const { validar, registroSchema, loginSchema } = require('../utils/validators');

// Rate limiting específico para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test',
});

// Rate limiting para registro
const registroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // máximo 3 registros por IP
  message: 'Muitos registros deste IP. Tente novamente em 1 hora.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV === 'test',
});

router.post('/registrar', registroLimiter, validar(registroSchema), registrar);
router.post('/login', loginLimiter, validar(loginSchema), login);

module.exports = router;
