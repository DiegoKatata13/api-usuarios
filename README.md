# 🚀 API de Usuários com Autenticação JWT

API REST desenvolvida em Node.js para cadastro, autenticação e gerenciamento de usuários, utilizando MongoDB e JWT para segurança.

---

## 📌 Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- Proteção de rotas privadas
- Atualização de perfil
- Exclusão de conta
- Criptografia de senha com bcrypt

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Bcrypt
- Dotenv
- Jest (testes)

---

## 📁 Estrutura do projeto

src/
 ├── config/
 ├── controllers/
 ├── middlewares/
 ├── models/
 ├── routes/
 ├── app.js
 └── server.js

---

## ⚙️ Como rodar o projeto

### 1. Instalar dependências
npm install

### 2. Criar arquivo .env
MONGO_URI=sua_url_mongodb
JWT_SECRET=sua_chave_secreta
PORT=3000

### 3. Rodar projeto
npm run dev

---

## 🔐 Autenticação

Authorization: Bearer SEU_TOKEN

---

## 📡 Rotas

POST /auth/register  
POST /auth/login  
GET /usuarios/perfil  
PUT /usuarios/perfil  
DELETE /usuarios/perfil

---

## 👨‍💻 Autor
Diego Silva
