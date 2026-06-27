# ⚡ Quick Start - 5 Minutos

Guia ultra-rápido para colocar a API rodando em 5 minutos!

## 📋 Pré-requisitos

- Node.js 18+
- MongoDB rodando (ou MongoDB Atlas)

## 🚀 Passo 1: Setup (2 minutos)

```bash
# Clone/extraia o projeto
cd api-usuarios

# Instale dependências
npm install

# Configure .env
cp .env.example .env

# Edite .env se necessário (valores padrão funcionam)
```

## ▶️ Passo 2: Inicie (30 segundos)

```bash
npm run dev
```

Pronto! API rodando em http://localhost:3000

## 🧪 Passo 3: Teste (2 minutos)

Abra outro terminal:

### Registre um usuário
```bash
curl -X POST http://localhost:3000/auth/registrar \
  -H \"Content-Type: application/json\" \
  -d '{
    \"nome\": \"João\",
    \"email\": \"joao@test.com\",
    \"senha\": \"Senha@123\"
  }'
```

### Faça login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H \"Content-Type: application/json\" \
  -d '{
    \"email\": \"joao@test.com\",
    \"senha\": \"Senha@123\"
  }'
```

Copie o `token` da resposta!

### Acesse seu perfil
```bash
TOKEN=\"seu-token-aqui\"
curl -X GET http://localhost:3000/usuarios/perfil \
  -H \"Authorization: Bearer $TOKEN\"
```

## ✅ Pronto!

Você acabou de:
- ✅ Registrar um usuário
- ✅ Fazer login
- ✅ Acessar dados protegidos

---

## 📚 Próximos Passos

1. **Aprender Mais**: Leia [README.md](./README.md)
2. **Ver Exemplos**: Abra [EXAMPLES.md](./EXAMPLES.md)
3. **Entender Arquitetura**: Leia [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Testar Tudo**: Execute `npm test`

---

## 🐛 Problemas?

| Problema | Solução |
|----------|---------|
| \"Port 3000 already in use\" | Use outra porta: `PORT=3001 npm run dev` |
| \"MongoDB connection failed\" | Inicie MongoDB ou configure MONGODB_URI em .env |
| \"Cannot find module\" | Execute `npm install` novamente |

---

## 🎯 Endpoints Rápido

```
POST   /auth/registrar          - Criar conta
POST   /auth/login              - Fazer login
GET    /usuarios/perfil         - Ver perfil (requer token)
PUT    /usuarios/perfil         - Atualizar perfil (requer token)
DELETE /usuarios/perfil         - Deletar conta (requer token)
```

---

**Vamos lá! 🚀**
