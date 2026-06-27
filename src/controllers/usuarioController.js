const Usuario = require('../models/Usuario');
const logger = require('../utils/logger');

// GET /usuarios/perfil  (usuário logado vê o próprio perfil)
const verPerfil = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) {
      logger.warn(`Tentativa de acesso a usuário inexistente: ${req.usuarioId}`);
      return res.status(404).json({ 
        erro: 'Usuário não encontrado' 
      });
    }

    logger.debug(`Perfil acessado: ${req.usuarioId}`);

    return res.json({
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        criadoEm: usuario.createdAt,
        atualizadoEm: usuario.updatedAt,
      },
    });
  } catch (erro) {
    logger.error('Erro ao buscar perfil:', erro);
    next(erro);
  }
};

// PUT /usuarios/perfil  (atualiza nome ou email)
const atualizarPerfil = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    const atualizacoes = {};

    if (nome) atualizacoes.nome = nome;
    if (email) atualizacoes.email = email;
    if (senha) atualizacoes.senha = senha;

    if (Object.keys(atualizacoes).length === 0) {
      return res.status(400).json({
        erro: 'Nenhum campo para atualizar',
      });
    }

    const usuario = await Usuario.findByIdAndUpdate(
      req.usuarioId,
      atualizacoes,
      { new: true, runValidators: true }
    );

    if (!usuario) {
      logger.warn(`Tentativa de atualizar usuário inexistente: ${req.usuarioId}`);
      return res.status(404).json({ 
        erro: 'Usuário não encontrado' 
      });
    }

    logger.info(`Perfil atualizado: ${req.usuarioId}`);

    return res.json({
      mensagem: 'Perfil atualizado com sucesso!',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        criadoEm: usuario.createdAt,
        atualizadoEm: usuario.updatedAt,
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

    logger.error('Erro ao atualizar perfil:', erro);
    next(erro);
  }
};

// DELETE /usuarios/perfil  (exclui própria conta)
const excluirConta = async (req, res, next) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.usuarioId);

    if (!usuario) {
      logger.warn(`Tentativa de excluir usuário inexistente: ${req.usuarioId}`);
      return res.status(404).json({
        erro: 'Usuário não encontrado',
      });
    }

    logger.info(`Conta excluída: ${req.usuarioId}`);

    return res.json({
      mensagem: 'Conta excluída com sucesso',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    logger.error('Erro ao excluir conta:', erro);
    next(erro);
  }
};

module.exports = { verPerfil, atualizarPerfil, excluirConta };
