# 🚀 Guia de Deploy

Este guia fornece instruções passo a passo para fazer deploy da aplicação em diferentes ambientes.

## Pré-requisitos Gerais

- Ter um repositório Git
- Ter conta em serviço de hospedagem (Heroku, Railway, Render, etc.)
- MongoDB Atlas configurado (para banco em produção)

---

## 🌍 Deploy em Heroku

### 1. Preparação Local

```bash
# Login no Heroku
heroku login

# Criar nova app
heroku create seu-app-name
```

### 2. Configurar Variáveis de Ambiente

```bash
# Set production env
heroku config:set NODE_ENV=production

# JWT Secret (gere uma chave forte)
heroku config:set JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# MongoDB URI (use MongoDB Atlas)
heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database

# CORS Origin
heroku config:set CORS_ORIGIN=https://seu-app-name.herokuapp.com

# Expiração de token
heroku config:set JWT_EXPIRES_IN=24h
```

### 3. Deploy

```bash
# Push para Heroku (automático)
git push heroku main

# Ou se estiver em branch diferente
git push heroku seu-branch:main

# Ver logs
heroku logs --tail
```

### 4. Verificar Deploy

```bash
# Testar API
curl https://seu-app-name.herokuapp.com/

# Ver status
heroku status

# Abrir no navegador
heroku open
```

### 5. Troubleshooting Heroku

```bash
# Rebuiilder app
heroku rebuild

# Restart dyno
heroku restart

# Ver variáveis de ambiente
heroku config

# Ver erro completo
heroku logs --source app -t
```

---

## 🚂 Deploy em Railway

### 1. Setup Inicial

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Criar projeto
railway init
```

### 2. Conectar GitHub

1. Vá para [railway.app](https://railway.app)
2. Conecte sua conta GitHub
3. Selecione repositório
4. Railway fará deploy automático

### 3. Configurar Variáveis

1. Vá para Project Settings
2. Configure as variáveis de ambiente:

```
NODE_ENV=production
JWT_SECRET=<sua-chave-secreta>
MONGODB_URI=<sua-uri-mongodb>
CORS_ORIGIN=https://seu-app.railway.app
JWT_EXPIRES_IN=24h
```

### 4. Deploy

```bash
# Deploy local
railway up

# Ver logs
railway logs

# Status
railway status
```

---

## 🎬 Deploy em Render

### 1. Conectar GitHub

1. Vá para [render.com](https://render.com)
2. Clique em \"New Web Service\"
3. Conecte seu repositório GitHub

### 2. Configurar Serviço

**Nome**: api-usuarios  
**Branch**: main  
**Runtime**: Node  
**Build Command**: `npm install`  
**Start Command**: `npm start`

### 3. Variáveis de Ambiente

```
NODE_ENV=production
JWT_SECRET=<sua-chave>
MONGODB_URI=<sua-uri>
CORS_ORIGIN=https://seu-app.onrender.com
JWT_EXPIRES_IN=24h
```

### 4. Deploy Automático

Render fará deploy automático em cada push para main.

---

## 🐳 Deploy com Docker

### 1. Criar Dockerfile

Já existe um template padrão, crie:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [\"npm\", \"start\"]
```

### 2. Build e Test Local

```bash
# Build image
docker build -t api-usuarios .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e JWT_SECRET=test-secret \
  -e MONGODB_URI=mongodb://mongo:27017/api-usuarios \
  api-usuarios
```

### 3. Deploy Docker Hub

```bash
# Login
docker login

# Tag image
docker tag api-usuarios seu-usuario/api-usuarios:1.0.0

# Push
docker push seu-usuario/api-usuarios:1.0.0
```

### 4. Deploy com Docker Compose

```yaml
version: '3'
services:
  app:
    image: api-usuarios:latest
    ports:
      - \"3000:3000\"
    environment:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      MONGODB_URI: mongodb://mongo:27017/api-usuarios
    depends_on:
      - mongo

  mongo:
    image: mongo:5
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## ☁️ Deploy em AWS

### Com Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-18 api-usuarios

# Create environment
eb create production

# Deploy
eb deploy

# Ver logs
eb logs
```

### Com EC2

1. Lance instância Ubuntu 22.04
2. SSH na instância
3. Configure Node.js e MongoDB
4. Clone repositório
5. Configure .env
6. Inicie com PM2

```bash
# SSH na instância
ssh -i key.pem ubuntu@seu-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Clone repo
git clone seu-repo.git
cd api-usuarios

# Install PM2
npm install -g pm2

# Configure .env
nano .env

# Start app
pm2 start src/server.js --name api-usuarios
pm2 startup
pm2 save
```

---

## 🔒 Production Checklist

Antes de fazer deploy em produção:

- [ ] `NODE_ENV=production`
- [ ] `JWT_SECRET` forte (mínimo 32 caracteres)
- [ ] `MONGODB_URI` aponta para MongoDB Atlas
- [ ] `CORS_ORIGIN` configurado para seu domínio
- [ ] HTTPS habilitado
- [ ] Database backups configurados
- [ ] Monitoramento ativo
- [ ] Logging centralizado
- [ ] Testes passando
- [ ] PM2 ou similar em execução
- [ ] Firewall configurado
- [ ] Rate limiting ativo
- [ ] Variáveis sensíveis em .env (não em código)

---

## 📊 Monitoramento em Produção

### PM2 Monitoring

```bash
# Instalar PM2 Plus
pm2 install pm2-auto-pull

# Monitor em tempo real
pm2 monitor

# Ver logs
pm2 logs

# Diagnosticar problemas
pm2 diagnose
```

### Application Insights (Azure)

```bash
npm install applicationinsights

# Em src/app.js
const appInsights = require('applicationinsights');
appInsights.setup('YOUR_KEY').start();
```

---

## 🔄 Atualizações e Rollback

### Atualizar em Produção

```bash
# Local
git add .
git commit -m 'Feature: novo recurso'
git push origin main

# Heroku (automático)
git push heroku main

# Railway (automático após push para GitHub)
```

### Rollback

**Heroku:**
```bash
heroku releases
heroku rollback v123
```

**Railway:**
```
Vá para Deployments e clique em redeploy de versão anterior
```

---

## 💾 Backup e Recuperação

### MongoDB Atlas Backups

1. Vá para Clusters
2. Clique em \"Backup\"
3. Configure backup automático diário

### Restaurar de Backup

```bash
# Download backup
mongorestore --uri=\"mongodb+srv://user:pass@cluster.mongodb.net\" \
  dump/api-usuarios
```

---

## 🎯 Estratégia de Deployment

### Blue-Green Deploy

1. Deploy novo em servidor \"Green\"
2. Teste completamente
3. Switch tráfego de Blue para Green
4. Mantenha Blue como fallback

### Canary Deploy

1. Deploy para 10% do tráfego
2. Monitore erros e performance
3. Se OK, aumentar para 100%

---

## ✅ Após Deploy

1. Verificar logs
2. Testar endpoints principais
3. Confirmar variáveis de ambiente
4. Verificar performance
5. Testar autenticação
6. Criar monitoramento
7. Documentar URL em produção

---

## 🆘 Troubleshooting

### Erro: \"Cannot find module\"

```
Solução: npm ci --only=production
```

### Erro: \"Connection to MongoDB failed\"

```
Solução: Verificar MONGODB_URI
- Verificar whitelist de IP no MongoDB Atlas
- Confirmar credenciais
```

### Erro: \"JWT_SECRET undefined\"

```
Solução: Configurar variável de ambiente
heroku config:set JWT_SECRET=sua-chave
```

### Aplicação lenta

```
Solução:
- Aumentar recursos do servidor
- Adicionar índices no MongoDB
- Implementar cache
- Verificar logs
```

---

## 📞 Suporte

- Documentação Heroku: https://devcenter.heroku.com/
- Documentação Railway: https://docs.railway.app/
- Documentação Render: https://render.com/docs/

---

**Deploy bem-sucedido! 🎉**
