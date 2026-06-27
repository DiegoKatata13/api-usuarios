const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      minlength: [3, 'O nome deve ter no mínimo 3 caracteres'],
      maxlength: [100, 'O nome não pode exceder 100 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório'],
      unique: [true, 'Este e-mail já está cadastrado'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Informe um e-mail válido'],
      index: true, // Índice para buscas mais rápidas
    },
    senha: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: [8, 'A senha deve ter no mínimo 8 caracteres'],
      select: false, // nunca retorna a senha nas buscas
    },
  },
  { 
    timestamps: true,
    collection: 'usuarios',
  }
);

// Antes de salvar, criptografa a senha se foi modificada
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (erro) {
    next(erro);
  }
});

// Método para comparar senha no login
usuarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

// Método para retornar dados públicos do usuário (sem dados sensíveis)
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.senha;
  delete usuario.__v;
  return usuario;
};

module.exports = mongoose.model('Usuario', usuarioSchema);
