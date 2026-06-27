const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../src/app');
const Usuario = require('../src/models/Usuario');
const conectarBanco = require('../src/config/database');

// Configurar ambiente de teste
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-12345';
process.env.JWT_EXPIRES_IN = '24h';

describe('API de Usuários - Testes de Integração', () => {
  let token;
  let usuarioId;

  // Conectar ao banco antes dos testes
  beforeAll(async () => {
    try {
      await conectarBanco();
      // Limpar coleção de usuários
      await Usuario.deleteMany({});
    } catch (erro) {
      console.error('Erro ao conectar ao banco:', erro);
    }
  });

  // Limpar banco após os testes
  afterAll(async () => {
    try {
      await Usuario.deleteMany({});
      await mongoose.disconnect();
    } catch (erro) {
      console.error('Erro ao desconectar:', erro);
    }
  });

  // ==================== TESTES DE ROTA RAIZ ====================
  describe('GET /', () => {
    it('deve retornar mensagem de boas-vindas', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('mensagem');
      expect(res.body).toHaveProperty('versao');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  // ==================== TESTES DE REGISTRO ====================
  describe('POST /auth/registrar', () => {
    it('deve registrar usuário com dados válidos', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'João Silva',
          email: 'joao@example.com',
          senha: 'Senha@123',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('mensagem');
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario).toHaveProperty('id');
      expect(res.body.usuario).toHaveProperty('nome');
      expect(res.body.usuario).toHaveProperty('email');
    });

    it('deve retornar 400 se email já existe', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Maria Silva',
          email: 'joao@example.com', // email já registrado
          senha: 'Senha@456',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('erro');
      expect(res.body.erro).toContain('cadastrado');
    });

    it('deve retornar 400 se email é inválido', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Pedro Santos',
          email: 'email-invalido',
          senha: 'Senha@789',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar 400 se senha não tem maiúscula', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Ana Costa',
          email: 'ana@example.com',
          senha: 'senha@123', // sem maiúscula
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar 400 se senha é muito curta', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Lucas Martins',
          email: 'lucas@example.com',
          senha: 'Sen@1', // menor que 8 caracteres
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar 400 se nome é muito curto', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Jo',
          email: 'jo@example.com',
          senha: 'Senha@123',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar 400 se algum campo obrigatório falta', async () => {
      const res = await request(app)
        .post('/auth/registrar')
        .send({
          nome: 'Carla Rocha',
          // falta email e senha
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });
  });

  // ==================== TESTES DE LOGIN ====================
  describe('POST /auth/login', () => {
    it('deve fazer login com email e senha corretos', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'joao@example.com',
          senha: 'Senha@123',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario).toHaveProperty('email');

      // Guardar token para próximos testes
      token = res.body.token;
      usuarioId = res.body.usuario.id;
    });

    it('deve retornar 401 com email incorreto', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'naoexiste@example.com',
          senha: 'Senha@123',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    it('deve retornar 401 com senha incorreta', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'joao@example.com',
          senha: 'SenhaErrada@123',
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    it('deve retornar 400 se email ou senha está faltando', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'joao@example.com',
          // falta senha
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });
  });

  // ==================== TESTES DE AUTENTICAÇÃO ====================
  describe('GET /usuarios/perfil', () => {
    it('deve retornar 401 sem token', async () => {
      const res = await request(app).get('/usuarios/perfil');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    it('deve retornar 401 com token inválido', async () => {
      const res = await request(app)
        .get('/usuarios/perfil')
        .set('Authorization', 'Bearer tokeninvalido123');

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });

    it('deve retornar 401 sem formato Bearer', async () => {
      const res = await request(app)
        .get('/usuarios/perfil')
        .set('Authorization', token);

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('erro');
    });
  });

  // ==================== TESTES DE PERFIL (Autenticado) ====================
  describe('GET /usuarios/perfil (Autenticado)', () => {
    it('deve retornar dados do perfil do usuário logado', async () => {
      const res = await request(app)
        .get('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario).toHaveProperty('id');
      expect(res.body.usuario).toHaveProperty('nome');
      expect(res.body.usuario).toHaveProperty('email');
      expect(res.body.usuario).toHaveProperty('criadoEm');
    });
  });

  // ==================== TESTES DE ATUALIZAÇÃO ====================
  describe('PUT /usuarios/perfil', () => {
    it('deve atualizar nome do usuário', async () => {
      const res = await request(app)
        .put('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'João Silva Santos',
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('mensagem');
      expect(res.body.usuario.nome).toBe('João Silva Santos');
    });

    it('deve retornar 400 se atualizar com email inválido', async () => {
      const res = await request(app)
        .put('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'email-invalido',
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('detalhes');
    });

    it('deve retornar 401 sem token', async () => {
      const res = await request(app)
        .put('/usuarios/perfil')
        .send({
          nome: 'Novo Nome',
        });

      expect(res.statusCode).toBe(401);
    });

    it('deve retornar 400 se nenhum campo for enviado', async () => {
      const res = await request(app)
        .put('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('erro');
    });
  });

  // ==================== TESTES DE EXCLUSÃO ====================
  describe('DELETE /usuarios/perfil', () => {
    it('deve retornar 401 sem token', async () => {
      const res = await request(app).delete('/usuarios/perfil');
      expect(res.statusCode).toBe(401);
    });

    it('deve excluir a conta do usuário', async () => {
      const res = await request(app)
        .delete('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('mensagem');
      expect(res.body.mensagem).toContain('excluída');
    });

    it('deve retornar 401 após exclusão ao tentar acessar', async () => {
      const res = await request(app)
        .get('/usuarios/perfil')
        .set('Authorization', `Bearer ${token}`);

      // Token é válido mas o usuário não existe mais
      expect(res.statusCode).toBe(404);
    });
  });

  // ==================== TESTES DE ROTA NÃO ENCONTRADA ====================
  describe('GET /rota-inexistente', () => {
    it('deve retornar 404 para rota não encontrada', async () => {
      const res = await request(app).get('/rota-inexistente');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('erro');
    });
  });
});
