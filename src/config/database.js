const mongoose = require('mongoose');
const logger = require('../utils/logger');

const conectarBanco = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não configurada nas variáveis de ambiente');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      // Opções recomendadas para Mongoose 8.x
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('✅ MongoDB conectado com sucesso!');

    // Eventos de conexão
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB desconectado');
    });

    mongoose.connection.on('error', (erro) => {
      logger.error('❌ Erro de conexão com MongoDB:', erro);
    });

    return mongoose.connection;
  } catch (erro) {
    logger.error('❌ Erro ao conectar no MongoDB:', erro);
    throw erro; // Propagar erro para tratamento no server.js
  }
};

module.exports = conectarBanco;
