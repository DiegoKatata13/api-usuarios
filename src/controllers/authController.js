const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// POST /auth/registrar
const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const emailJaExiste = await Usuario.findOne({ email });
    if (emailJaExiste) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }

    const usuario = await Usuario.create({ nome, email, senha });

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (erro) {
    if (erro.name === 'ValidationError') {
      const mensagens = Object.values(erro.errors).map((e) => e.message);
      return res.status(400).json({ erros: mensagens });
    }
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    const usuario = await Usuario.findOne({ email }).select('+senha');
    if (!usuario) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch {
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

module.exports = { registrar, login };
