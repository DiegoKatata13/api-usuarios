# 👤 API REST de Cadastro de Usuários

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-24%20passing-brightgreen)

Uma API REST robusta e profissional para autenticação e gerenciamento de usuários, desenvolvida com Node.js, Express e MongoDB, pronta para produção.

## ✨ Funcionalidades

- ✅ **Cadastro seguro** de usuários com validação rigorosa de dados
- ✅ **Login com JWT** - Geração de tokens seguros com expiração configurável
- ✅ **Autenticação** - Rotas protegidas por middleware JWT
- ✅ **Rate Limiting** - Proteção contra brute force e abuso de API
- ✅ **Validação robusta** - Usando Joi com mensagens de erro detalhadas
- ✅ **CORS configurável** - Suporte a múltiplas origens
- ✅ **Logging estruturado** - Rastreamento completo de operações
- ✅ **Tratamento de erros** - Middleware global com respostas consistentes
- ✅ **Testes abrangentes** - Suite de testes de integração com Jest
- ✅ **Segurança** - Senhas com hash bcryptjs, validação de email, proteção de dados

## 🛠 Stack Tecnológico

| Tecnologia | Versão | Propósito |
|-----------|--------|----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Express** | ^4.18.2 | Framework HTTP |
| **MongoDB** | - | Banco de dados NoSQL |
| **Mongoose** | ^8.0.3 | ODM para MongoDB |
| **JWT** | ^9.0.2 | Autenticação de tokens |
| **bcryptjs** | ^2.4.3 | Hash de senhas |
| **Joi** | ^17+ | Validação de esquema |
| **express-rate-limit** | ^7+ | Rate limiting |
| **cors** | ^2.8+ | CORS configurável |
| **dotenv** | ^16.3.1 | Variáveis de ambiente |
| **Jest** | ^29.7.0 | Testes (dev) |
| **Supertest** | ^6.3.4 | Testes de API (dev) |

## 📋 Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **MongoDB** 4.4+ (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/DiegoKatata13/api-usuarios.git
cd api-usuarios
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=sua_uri_do_mongodb_aqui
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### 4. Inicie o servidor

**Desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

**Testes:**
```bash
npm test
```

## 📚 Endpoints da API

### 🔓 Autenticação (Sem proteção)

#### Registrar novo usuário
```http
POST /auth/registrar
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

**Resposta (201):**
```json
{
  "mensagem": "Usuário criado com sucesso!",
  "usuario": {
    "id": "6123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validações:**
- Nome: mínimo 3, máximo 100 caracteres
- Email: deve ser válido e único
- Senha: mínimo 8 caracteres, com letras maiúsculas, minúsculas e números

---

#### Fazer login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "6123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

---

### 🔒 Perfil (Requer autenticação)

#### Visualizar perfil
```http
GET /usuarios/perfil
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "usuario": {
    "id": "6123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z",
    "atualizadoEm": "2024-01-15T11:45:00.000Z"
  }
}
```

---

#### Atualizar perfil
```http
PUT /usuarios/perfil
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "João Silva Santos",
  "email": "novo@example.com",
  "senha": "NovaSenha@456"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Perfil atualizado com sucesso!",
  "usuario": {
    "id": "6123456789abcdef",
    "nome": "João Silva Santos",
    "email": "novo@example.com"
  }
}
```

---

#### Excluir conta
```http
DELETE /usuarios/perfil
Authorization: Bearer <token>
```

**Resposta (200):**
```json
{
  "mensagem": "Conta excluída com sucesso",
  "usuario": {
    "id": "6123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

---

## 🔐 Segurança

- ✅ **Hash de Senhas**: bcryptjs com 10 rounds
- ✅ **JWT**: Tokens com expiração configurável
- ✅ **Rate Limiting**: 5 tentativas de login por 15 minutos
- ✅ **CORS**: Configurável por variável de ambiente
- ✅ **Validação de Input**: Joi com regras rigorosas
- ✅ **Proteção de Dados**: Senhas nunca retornam nas queries

### Requisitos de Senha
- Mínimo 8 caracteres
- Pelo menos uma letra maiúscula
- Pelo menos uma letra minúscula
- Pelo menos um número

## 📊 Estrutura do Projeto

```
api-usuarios/
├── src/
│   ├── app.js                       # Configuração do Express
│   ├── server.js                    # Ponto de entrada
│   ├── config/
│   │   └── database.js              # Conexão com MongoDB
│   ├── controllers/
│   │   ├── authController.js        # Registrar e login
│   │   └── usuarioController.js     # Perfil do usuário
│   ├── middlewares/
│   │   ├── autenticar.js            # Validação do token JWT
│   │   └── errorHandler.js          # Tratamento de erros
│   ├── models/
│   │   └── Usuario.js               # Schema do MongoDB
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   └── utils/
│       ├── logger.js                # Logging centralizado
│       └── validators.js            # Schemas Joi
├── tests/
│   └── api.test.js                  # Suite de testes
├── .env.example
├── .gitignore
└── package.json
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm test -- --coverage
```

**Testes incluem:**
- ✅ Registro com dados válidos e inválidos
- ✅ Login com credenciais corretas e incorretas
- ✅ Validação de tokens JWT
- ✅ Proteção de rotas autenticadas
- ✅ CRUD de perfil de usuário
- ✅ Tratamento de erros e casos de borda

## 🚀 Deploy

### Variáveis de Ambiente em Produção
Certifique-se de definir:
- `NODE_ENV=production`
- `JWT_SECRET` (chave forte e aleatória)
- `MONGODB_URI` (URI do MongoDB Atlas)
- `CORS_ORIGIN` (domínio do frontend)

### Gerar chave JWT segura
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 💡 Próximas Melhorias

- [ ] Recuperação de senha por email
- [ ] Autenticação multi-fator (MFA)
- [ ] OAuth 2.0 (Google, GitHub)
- [ ] Refresh tokens
- [ ] Documentação OpenAPI/Swagger
- [ ] Cache com Redis

## 👨‍💻 Autor

**Diego Silva**
Desenvolvedor back-end em formação, focado em Node.js e APIs REST.

[GitHub](https://github.com/DiegoKatata13)
