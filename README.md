# 👤 API REST de Cadastro de Usuários

API REST desenvolvida com **Node.js**, **Express** e **MongoDB** para cadastro e autenticação de usuários com JWT.

## 🚀 Funcionalidades

- Cadastro de usuário com senha criptografada (bcrypt)
- Login com geração de token JWT
- Visualização do próprio perfil (rota protegida)
- Atualização de dados do perfil
- Exclusão de conta

## 🛠 Tecnologias

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com) + [Mongoose](https://mongoosejs.com)
- [JSON Web Token (JWT)](https://jwt.io)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB rodando localmente ou uma URI do [MongoDB Atlas](https://www.mongodb.com/atlas)

## ⚙️ Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/api-usuarios.git
cd api-usuarios

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Inicie o servidor em modo desenvolvimento
npm run dev
```

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
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
