# 🧪 Exemplos de Uso da API

Guia prático com exemplos de como usar a API com diferentes ferramentas.

## 🚀 Início Rápido

### 1. Inicie o servidor

```bash
npm install
npm run dev
```

Servidor rodando em: `http://localhost:3000`

### 2. Teste a API

Use um dos exemplos abaixo com curl, Insomnia ou Postman.

---

## 📝 Exemplos com cURL

### 1. Verificar se API está rodando

```bash
curl -X GET http://localhost:3000/
```

**Resposta esperada:**
```json
{
  "mensagem": "🚀 API de Usuários funcionando!",
  "versao": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Registrar novo usuário

```bash
curl -X POST http://localhost:3000/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "Senha@123"
  }'
```

**Resposta esperada (201):**
```json
{
  "mensagem": "Usuário criado com sucesso!",
  "usuario": {
    "id": "65a123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z"
  }
}
```

**Casos de erro:**

Senha fraca:
```bash
curl -X POST http://localhost:3000/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria",
    "email": "maria@example.com",
    "senha": "senha123"
  }'
```

Email inválido:
```bash
curl -X POST http://localhost:3000/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pedro Santos",
    "email": "email-invalido",
    "senha": "Senha@123"
  }'
```

---

### 3. Fazer login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "Senha@123"
  }'
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTEyMzQ1Njc4OWFiY2RlZiIsImVtYWlsIjoiam9hb0BleGFtcGxlLmNvbSIsImlhdCI6MTY5MzUwMDAwMCwiZXhwIjoxNjkzNTg2NDAwfQ.XYZ...",
  "usuario": {
    "id": "65a123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com"
  }
}
```

**Guardar o token para próximas requisições:**
```bash
TOKEN=\"seu-token-jwt-aqui\"
```

---

### 4. Acessar perfil (requer token)

```bash
TOKEN=\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"

curl -X GET http://localhost:3000/usuarios/perfil \
  -H \"Authorization: Bearer $TOKEN\" \
  -H "Content-Type: application/json"
```

**Resposta esperada (200):**
```json
{
  "usuario": {
    "id": "65a123456789abcdef",
    "nome": "João Silva",
    "email": "joao@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z",
    "atualizadoEm": "2024-01-15T10:30:00.000Z"
  }
}
```

**Sem token (erro 401):**
```bash
curl -X GET http://localhost:3000/usuarios/perfil \
  -H "Content-Type: application/json"

# Resposta: {"erro": "Token não informado", ...}
```

---

### 5. Atualizar perfil

```bash
curl -X PUT http://localhost:3000/usuarios/perfil \
  -H \"Authorization: Bearer $TOKEN\" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Santos",
    "email": "joao.novo@example.com"
  }'
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Perfil atualizado com sucesso!",
  "usuario": {
    "id": "65a123456789abcdef",
    "nome": "João Silva Santos",
    "email": "joao.novo@example.com",
    "criadoEm": "2024-01-15T10:30:00.000Z",
    "atualizadoEm": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### 6. Deletar conta

```bash
curl -X DELETE http://localhost:3000/usuarios/perfil \
  -H \"Authorization: Bearer $TOKEN\" \
  -H "Content-Type: application/json"
```

**Resposta esperada (200):**
```json
{
  "mensagem": "Conta excluída com sucesso",
  "usuario": {
    "id": "65a123456789abcdef",
    "nome": "João Silva Santos",
    "email": "joao.novo@example.com"
  }
}
```

---

## 📮 Exemplos com Insomnia / Postman

### Importar Collection

1. Abra Insomnia/Postman
2. Crie nova collection: \"API Usuários\"
3. Adicione as requisições abaixo:

### Environment Variables

```json
{
  "base_url": "http://localhost:3000",
  "token": ""
}
```

### Requisições

#### 1. GET / - Status
```
GET {{base_url}}/
```

#### 2. POST /auth/registrar

```
POST {{base_url}}/auth/registrar
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

#### 3. POST /auth/login

```
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

**Após login, copie o token e defina:**
```
POST resposta > Token > Set as variable > {{token}}
```

#### 4. GET /usuarios/perfil

```
GET {{base_url}}/usuarios/perfil
Authorization: Bearer {{token}}
```

#### 5. PUT /usuarios/perfil

```
PUT {{base_url}}/usuarios/perfil
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "nome": "Novo Nome"
}
```

#### 6. DELETE /usuarios/perfil

```
DELETE {{base_url}}/usuarios/perfil
Authorization: Bearer {{token}}
```

---

## 🧪 Executar com Script

Se você está em um sistema Unix/Linux/Mac:

```bash
chmod +x EXAMPLES.sh
./EXAMPLES.sh
```

---

## ⚠️ Validações Importantes

### Requisitos de Senha
```
✅ Válida: Senha@123
❌ Inválida: senha123 (sem maiúscula)
❌ Inválida: SENHA123 (sem minúscula)
❌ Inválida: Senhabc (sem número)
❌ Inválida: Se@1 (muito curta < 8 caracteres)
```

### Requisitos de Email
```
✅ Válido: joao@example.com
✅ Válido: user+tag@domain.co.uk
❌ Inválido: joao@
❌ Inválido: @example.com
❌ Inválido: joaoemail.com (sem @)
```

### Requisitos de Nome
```
✅ Válido: João Silva
✅ Válido: Ana Maria da Silva
❌ Inválido: Jo (muito curto < 3 caracteres)
❌ Inválido: A (muito curto)
```

---

## 🔐 Segurança nos Exemplos

### Rate Limiting

Você verá erro 429 se exceder os limites:
```json
{
  "erro": "Muitas tentativas de login. Tente novamente em 15 minutos."
}
```

Limites:
- Login: 5 tentativas por 15 minutos
- Registro: 3 tentativas por IP por hora

### Proteção de Dados

- ✅ Senhas NUNCA são retornadas nas respostas
- ✅ Tokens JWT expiram em 24 horas
- ✅ Emails devem ser válidos e únicos

---

## 🐛 Troubleshooting

### Erro: \"Connection refused\"
```
Servidor não está rodando. Execute:
npm run dev
```

### Erro: \"JWT_SECRET não configurado\"
```
Crie arquivo .env:
JWT_SECRET=sua-chave-secreta
```

### Erro: \"MongoDB connection failed\"
```
MongoDB não está rodando. Inicie:
# Localmente:
mongod

# Ou use MongoDB Atlas na variável MONGODB_URI
```

### Erro: 401 Unauthorized
```
Token está inválido ou expirado. Faça login novamente.
```

---

## 📊 Testando Casos de Erro

### Email duplicado
```bash
# Registre uma vez, tente registrar novamente com mesmo email
curl -X POST http://localhost:3000/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Outro Nome",
    "email": "joao@example.com",
    "senha": "Senha@123"
  }'
# Resposta: 400 - \"E-mail já cadastrado\"
```

### Credenciais inválidas no login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "naoexiste@example.com",
    "senha": "QualquerSenha@123"
  }'
# Resposta: 401 - \"E-mail ou senha incorretos\"
```

### Acesso negado (sem token)
```bash
curl -X GET http://localhost:3000/usuarios/perfil
# Resposta: 401 - \"Token não informado\"
```

---

## ✅ Conclusão

Você agora pode:
- ✅ Registrar novos usuários
- ✅ Fazer login
- ✅ Acessar dados autenticados
- ✅ Atualizar perfil
- ✅ Deletar conta

**Para mais informações**, veja:
- [README.md](./README.md) - Visão geral
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura
- [QUALITY.md](./QUALITY.md) - Garantia de qualidade

---

**Happy testing! 🚀**
