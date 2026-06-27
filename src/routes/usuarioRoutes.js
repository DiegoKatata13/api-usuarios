const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/autenticar');
const { verPerfil, atualizarPerfil, excluirConta } = require('../controllers/usuarioController');
const { validar, atualizarUsuarioSchema } = require('../utils/validators');

// Todas as rotas abaixo exigem token JWT
router.use(autenticar);

router.get('/perfil', verPerfil);
router.put('/perfil', validar(atualizarUsuarioSchema), atualizarPerfil);
router.delete('/perfil', excluirConta);

module.exports = router;
