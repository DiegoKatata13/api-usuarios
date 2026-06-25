const express = require('express');
const router = express.Router();
const autenticar = require('../middlewares/autenticar');
const { verPerfil, atualizarPerfil, excluirConta } = require('../controllers/usuarioController');

// Todas as rotas abaixo exigem token JWT
router.use(autenticar);

router.get('/perfil', verPerfil);
router.put('/perfil', atualizarPerfil);
router.delete('/perfil', excluirConta);

module.exports = router;
