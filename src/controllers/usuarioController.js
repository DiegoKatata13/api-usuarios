const Usuario = require('../models/Usuario');

// GET /usuarios/perfil  (usuário logado vê o próprio perfil)
const verPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    return res.json(usuario);
  } catch {
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// PUT /usuarios/perfil  (atualiza nome ou email)
const atualizarPerfil = async (req, res) => {
  try {
    const { nome, email } = req.body;

    // Impede atualizar senha por esta rota
    const usuario = await Usuario.findByIdAndUpdate(
      req.usuarioId,
      { nome, email },
      { new: true, runValidators: true }
    );

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.json({ mensagem: 'Perfil atualizado!', usuario });
  } catch (erro) {
    if (erro.name === 'ValidationError') {
      const mensagens = Object.values(erro.errors).map((e) => e.message);
      return res.status(400).json({ erros: mensagens });
    }
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

// DELETE /usuarios/perfil  (exclui própria conta)
const excluirConta = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.usuarioId);
    return res.json({ mensagem: 'Conta excluída com sucesso' });
  } catch {
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
};

module.exports = { verPerfil, atualizarPerfil, excluirConta };
