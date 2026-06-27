const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const logger = require('../utils/logger');

// POST /auth/registrar
const registrar = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se email já existe
    const emailJaExiste = await Usuario.findOne({ email });
    if (emailJaExiste) {
      logger.warn(`Tentativa de registro com e-mail já existente: ${email}`);
      return res.status(400).json({ 
        erro: 'E-mail já cadastrado',
        campo: 'email',
      });
    }

    // Criar usuário
    const usuario = await Usuario.create({ nome, email, senha });

    logger.info(`Novo usuário registrado: ${usuario._id}`);

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        criadoEm: usuario.createdAt,
      },
    });
  } catch (erro) {
    if (erro.name === 'ValidationError') {
      const mensagens = Object.values(erro.errors).map((e) => e.message);
      return res.status(400).json({ 
        erro: 'Erro de validação',
        detalhes: mensagens,
      });
    }
    
    if (erro.code === 11000) {
      return res.status(400).json({ 
        erro: 'E-mail já cadastrado',
        campo: 'email',
      });
    }

    logger.error('Erro ao registrar usuário:', erro);
    next(erro);
  }
};

// POST /auth/login
const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    // Buscar usuário
    const usuario = await Usuario.findOne({ email }).select('+senha');
    if (!usuario) {
      logger.warn(`Falha de login: usuário não encontrado - ${email}`);
      return res.status(401).json({ 
        erro: 'E-mail ou senha incorretos' 
      });
    }

    // Verificar senha
    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      logger.warn(`Falha de login: senha incorreta - ${email}`);
      return res.status(401).json({ 
        erro: 'E-mail ou senha incorretos' 
      });
    }

    // Verificar variáveis de ambiente
    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET não configurado');
      throw new Error('Configuração de servidor inválida');
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    logger.info(`Login bem-sucedido: ${usuario._id}`);

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    logger.error('Erro ao fazer login:', erro);
    next(erro);
  }
};

module.exports = { registrar, login };
