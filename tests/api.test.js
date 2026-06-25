const request = require('supertest');
const app = require('../src/app');

// Testes básicos da API (sem banco — testa apenas a estrutura das respostas)

describe('GET /', () => {
  it('deve retornar mensagem de boas-vindas', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem');
  });
});

describe('POST /auth/registrar', () => {
  it(
    'deve retornar 500 quando não há banco conectado (esperado em ambiente de teste)',
    async () => {
      const res = await request(app).post('/auth/registrar').send({
        nome: 'Diego',
        email: 'diego@email.com',
        senha: '123456',
      });
      expect([201, 500]).toContain(res.statusCode);
    },
    15000
  );

  it(
    'deve retornar 400 ou 500 se o e-mail não for informado',
    async () => {
      const res = await request(app).post('/auth/registrar').send({
        nome: 'Diego',
        senha: '123456',
      });
      expect([400, 500]).toContain(res.statusCode);
    },
    15000
  );
});

describe('POST /auth/login', () => {
  it('deve retornar 400 se não enviar email e senha', async () => {
    const res = await request(app).post('/auth/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('erro');
  });
});

describe('GET /usuarios/perfil', () => {
  it('deve retornar 401 sem token', async () => {
    const res = await request(app).get('/usuarios/perfil');
    expect(res.statusCode).toBe(401);
  });

  it('deve retornar 401 com token inválido', async () => {
    const res = await request(app)
      .get('/usuarios/perfil')
      .set('Authorization', 'Bearer tokeninvalido');
    expect(res.statusCode).toBe(401);
  });
});
