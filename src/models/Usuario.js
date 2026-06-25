const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      minlength: [2, 'O nome deve ter no mínimo 2 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Informe um e-mail válido'],
    },
    senha: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
      select: false, // nunca retorna a senha nas buscas
    },
  },
  { timestamps: true }
);

// Antes de salvar, criptografa a senha
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Método para comparar senha no login
usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
