const Joi = require('joi');

// Schema para registro
const registroSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter no mínimo 3 caracteres',
      'string.max': 'Nome não pode exceder 100 caracteres',
      'any.required': 'Nome é obrigatório',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'E-mail inválido',
      'string.empty': 'E-mail é obrigatório',
      'any.required': 'E-mail é obrigatório',
    }),

  senha: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.empty': 'Senha é obrigatória',
      'string.min': 'Senha deve ter no mínimo 8 caracteres',
      'string.max': 'Senha não pode exceder 50 caracteres',
      'string.pattern.base':
        'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
      'any.required': 'Senha é obrigatória',
    }),
});

// Schema para login
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'E-mail inválido',
      'string.empty': 'E-mail é obrigatório',
      'any.required': 'E-mail é obrigatório',
    }),

  senha: Joi.string()
    .required()
    .messages({
      'string.empty': 'Senha é obrigatória',
      'any.required': 'Senha é obrigatória',
    }),
});

// Schema para atualizar usuário
const atualizarUsuarioSchema = Joi.object({
  nome: Joi.string()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'Nome deve ter no mínimo 3 caracteres',
      'string.max': 'Nome não pode exceder 100 caracteres',
    }),

  email: Joi.string()
    .email()
    .messages({
      'string.email': 'E-mail inválido',
    }),

  senha: Joi.string()
    .min(8)
    .max(50)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.min': 'Senha deve ter no mínimo 8 caracteres',
      'string.max': 'Senha não pode exceder 50 caracteres',
      'string.pattern.base':
        'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número',
    }),
}).min(1);

// Middleware de validação
const validar = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const mensagens = error.details.map((detail) => detail.message);
      return res.status(400).json({
        erro: 'Erro de validação',
        detalhes: mensagens,
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  registroSchema,
  loginSchema,
  atualizarUsuarioSchema,
  validar,
};
