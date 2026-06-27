const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const autenticar = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      logger.warn('Acesso negado: sem header Authorization');
      return res.status(401).json({ 
        erro: 'Token não informado',
        detalhes: 'Header Authorization ausente',
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      logger.warn('Acesso negado: formato de token inválido');
      return res.status(401).json({ 
        erro: 'Formato de token inválido',
        detalhes: 'Use o formato: Bearer <token>',
      });
    }

    const token = authHeader.slice(7); // Remove "Bearer "

    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET não configurado');
      return res.status(500).json({ 
        erro: 'Erro de configuração do servidor' 
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.usuarioId = payload.id;
      req.usuarioEmail = payload.email;
      logger.debug(`Autenticação bem-sucedida: ${payload.id}`);
      next();
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        logger.warn(`Token expirado: ${jwtError.expiredAt}`);
        return res.status(401).json({ 
          erro: 'Token expirado',
          detalhes: 'Faça login novamente',
        });
      }

      if (jwtError.name === 'JsonWebTokenError') {
        logger.warn(`Token inválido: ${jwtError.message}`);
        return res.status(401).json({ 
          erro: 'Token inválido',
        });
      }

      throw jwtError;
    }
  } catch (erro) {
    logger.error('Erro no middleware de autenticação:', erro);
    return res.status(500).json({ 
      erro: 'Erro ao validar token' 
    });
  }
};

module.exports = autenticar;
