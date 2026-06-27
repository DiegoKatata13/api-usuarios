# 👤 API REST de Cadastro de Usuários

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
git clone https://github.com/seu-usuario/api-usuarios.git
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
# Ambiente
NODE_ENV=development
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/api-usuarios

# JWT
JWT_SECRET=sua-chave-super-secreta-aqui
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
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
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
    "email": "novo@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z",
    "atualizadoEm": "2024-01-15T12:00:00.000Z"
  }
}
```

---

#### Excluir conta
```http
DELETE /usuarios/perfil
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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

### Implementações
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
.
├── src/
│   ├── app.js                 # Setup do Express
│   ├── server.js              # Inicialização do servidor
│   ├── config/
│   │   └── database.js        # Conexão MongoDB
│   ├── controllers/           # Lógica de negócio
│   │   ├── authController.js
│   │   └── usuarioController.js
│   ├── models/
│   │   └── Usuario.js         # Schema Mongoose
│   ├── middlewares/
│   │   ├── autenticar.js      # Validação JWT
│   │   └── errorHandler.js    # Tratamento de erros
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   └── utils/
│       ├── logger.js          # Logging centralizado
│       └── validators.js      # Schemas Joi
├── tests/
│   └── api.test.js            # Suite de testes
├── logs/                      # Arquivos de log
├── .env.example               # Variáveis de exemplo
├── package.json
└── README.md
```

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar com cobertura
```bash
npm test -- --coverage
```

### Testes incluem:
- ✅ Registros com dados válidos e inválidos
- ✅ Login com credenciais corretas e incorretas
- ✅ Validação de tokens JWT
- ✅ Proteção de rotas autenticadas
- ✅ CRUD de perfil de usuário
- ✅ Rate limiting
- ✅ Tratamento de erros
- ✅ Casos de borda

**Total de testes**: 30+  
**Cobertura**: ~95%

## 🚀 Deploy

### Heroku
```bash
heroku login
heroku create seu-app-name
heroku config:set JWT_SECRET=sua-chave
git push heroku main
```

### Docker
```bash
docker build -t api-usuarios .
docker run -p 3000:3000 api-usuarios
```

### Environment Variables em Produção
Certifique-se de definir:
- `NODE_ENV=production`
- `JWT_SECRET` (chave forte)
- `MONGODB_URI` (MongoDB Atlas URI)
- `CORS_ORIGIN` (domínio do frontend)

## 📝 Logging

Os logs são salvos em `logs/app-YYYY-MM-DD.log` e também exibidos no console com cores:

```
[2024-01-15T10:30:00.000Z] [INFO] Novo usuário registrado: 6123456789abcdef
[2024-01-15T10:31:00.000Z] [INFO] Login bem-sucedido: 6123456789abcdef
[2024-01-15T10:32:00.000Z] [WARN] Tentativa de registro com e-mail já existente
[2024-01-15T10:33:00.000Z] [ERROR] Erro ao conectar ao banco de dados
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT - veja o arquivo LICENSE para detalhes

## 👨‍💼 Autor

**Diego** - [GitHub](https://github.com/seu-usuario)

---

## 💡 Próximas Melhorias

- [ ] Recuperação de senha por email
- [ ] Autenticação multi-fator (MFA)
- [ ] OAuth 2.0 (Google, GitHub)
- [ ] Refresh tokens
- [ ] Soft delete para usuários
- [ ] Documentação OpenAPI/Swagger
- [ ] Cache com Redis
- [ ] Metrics e APM

## ❓ FAQ

**P: Como gero uma chave JWT segura?**  
R: Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

**P: Posso usar isso em produção?**  
R: Sim! Certifique-se de configurar as variáveis de ambiente corretamente e usar HTTPS.

**P: Como funciona o Rate Limiting?**  
R: Login: máximo 5 tentativas por 15 minutos. Registro: máximo 3 por IP por hora.

---

**Última atualização**: Janeiro 2024  
**Versão**: 1.0.0
MONGODB_URI=sua_uri_do_mongodb_aqui
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=7d
```

## 📡 Endpoints

### Autenticação (público)

| Método | Rota              | Descrição          |
|--------|-------------------|--------------------|
| POST   | /auth/registrar   | Cadastrar usuário  |
| POST   | /auth/login       | Fazer login        |

### Usuários (requer token JWT)

| Método | Rota              | Descrição             |
|--------|-------------------|-----------------------|
| GET    | /usuarios/perfil  | Ver perfil            |
| PUT    | /usuarios/perfil  | Atualizar perfil      |
| DELETE | /usuarios/perfil  | Excluir conta         |

### Exemplos de requisição

**Registrar:**
```json
POST /auth/registrar
{
  "nome": "Diego",
  "email": "diego@email.com",
  "senha": "123456"
}
```

**Login:**
```json
POST /auth/login
{
  "email": "diego@email.com",
  "senha": "123456"
}
```

**Acessar perfil (com token):**
```
GET /usuarios/perfil
Authorization: Bearer <token>
```

## 🧪 Testes

```bash
npm test
```

## 📁 Estrutura do Projeto

```
api-usuarios/
├── src/
│   ├── config/
│   │   └── database.js              # Conexão com MongoDB
│   ├── controllers/
│   │   ├── authController.js        # Registrar e login
│   │   └── usuarioController.js     # Perfil do usuário
│   ├── middlewares/
│   │   └── autenticar.js            # Validação do token JWT
│   ├── models/
│   │   └── Usuario.js               # Schema do MongoDB
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   ├── app.js                       # Configuração do Express
│   └── server.js                    # Ponto de entrada
├── tests/
│   └── api.test.js
├── .env.example
├── .gitignore
└── package.json
```

## 👨‍💻 Autor

**Diego** 🚀
