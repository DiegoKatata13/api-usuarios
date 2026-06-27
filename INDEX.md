# 📖 Índice de Documentação

Bem-vindo! Este é o índice central da documentação do projeto. Escolha um tópico para começar:

## 🚀 Começando

1. **[README.md](./README.md)** ← **COMECE AQUI**
   - Visão geral do projeto
   - Como instalar e configurar
   - Endpoints disponíveis
   - Exemplos básicos

2. **[EXAMPLES.md](./EXAMPLES.md)**
   - Exemplos práticos de uso
   - Comandos cURL prontos
   - Integração com Insomnia/Postman
   - Troubleshooting

## 🏗️ Arquitetura & Design

3. **[ARCHITECTURE.md](./ARCHITECTURE.md)**
   - Estrutura em camadas
   - Padrões de projeto
   - Fluxo de requisições
   - Decisões arquiteturais
   - Scalabilidade

## 🔒 Qualidade & Segurança

4. **[QUALITY.md](./QUALITY.md)**
   - Métricas de qualidade
   - Boas práticas implementadas
   - Cobertura de testes
   - Conformidade
   - Vulnerabilidades conhecidas

5. **[SECURITY.md](./SECURITY.md)** *(Em desenvolvimento)*
   - Guia de segurança
   - Vulnerabilidades comuns
   - Melhores práticas
   - Como reportar bugs

## 🌐 Deploy & Produção

6. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Deploy em Heroku
   - Deploy em Railway
   - Deploy em Render
   - Deploy com Docker
   - Deploy em AWS
   - Production checklist

## 🤝 Desenvolvimento

7. **[CONTRIBUTING.md](./CONTRIBUTING.md)**
   - Como contribuir
   - Padrões de código
   - Processo de PR
   - Setup de desenvolvimento
   - Debugging

8. **[ROADMAP.md](./ROADMAP.md)**
   - Planejamento futuro
   - Versões planejadas
   - Features em desenvolvimento
   - Timeline de releases

## 📊 Este Índice

- [INDEX.md](./INDEX.md) ← Você está aqui

---

## 📚 Guia Rápido por Objetivo

### 🎯 "Quero testar a API rapidamente"
1. [README.md - Instalação](./README.md#⚙️-instalação-e-configuração)
2. [EXAMPLES.md](./EXAMPLES.md)
3. Execute: `npm install && npm run dev`

### 🎯 "Quero entender como funciona"
1. [ARCHITECTURE.md](./ARCHITECTURE.md)
2. [README.md - Endpoints](./README.md#📚-endpoints-da-api)
3. [EXAMPLES.md](./EXAMPLES.md)

### 🎯 "Quero fazer deploy em produção"
1. [QUALITY.md - Production Checklist](./QUALITY.md)
2. [DEPLOYMENT.md](./DEPLOYMENT.md)
3. [README.md - Segurança](./README.md#🔐-segurança)

### 🎯 "Quero contribuir"
1. [CONTRIBUTING.md](./CONTRIBUTING.md)
2. [ROADMAP.md](./ROADMAP.md)
3. [ARCHITECTURE.md](./ARCHITECTURE.md)

### 🎯 "Quero testar os testes"
1. [README.md - Testes](./README.md#🧪-testes)
2. [QUALITY.md - Coverage](./QUALITY.md#coverage-de-testes)
3. Execute: `npm test`

### 🎯 "Tenho um problema"
1. [EXAMPLES.md - Troubleshooting](./EXAMPLES.md#-troubleshooting)
2. [DEPLOYMENT.md - Troubleshooting](./DEPLOYMENT.md#-troubleshooting)
3. [CONTRIBUTING.md - Reportar Bug](./CONTRIBUTING.md#1-reportar-bugs)

---

## 📁 Estrutura de Arquivos

```
.
├── README.md              ← Comece aqui!
├── INDEX.md              ← Este arquivo
├── EXAMPLES.md           ← Exemplos práticos
├── ARCHITECTURE.md       ← Design & estrutura
├── QUALITY.md            ← Métricas & qualidade
├── CONTRIBUTING.md       ← Como contribuir
├── ROADMAP.md            ← Futuro do projeto
├── DEPLOYMENT.md         ← Deploy & produção
├── .env.example          ← Variáveis de exemplo
├── .gitignore            ← Git ignore
├── package.json          ← Dependências
├── EXAMPLES.sh           ← Script de exemplos
│
├── src/
│   ├── app.js            ← Setup Express
│   ├── server.js         ← Inicialização
│   ├── config/
│   │   └── database.js   ← Conexão MongoDB
│   ├── controllers/      ← Lógica
│   │   ├── authController.js
│   │   └── usuarioController.js
│   ├── models/
│   │   └── Usuario.js    ← Schema
│   ├── middlewares/
│   │   ├── autenticar.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   └── utils/
│       ├── logger.js
│       └── validators.js
│
├── tests/
│   └── api.test.js       ← Suite de testes
│
└── logs/                 ← Arquivos de log
    └── app-YYYY-MM-DD.log
```

---

## 🔗 Links Rápidos

### Documentação Externa
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/routing.html)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

### Ferramentas Recomendadas
- [Insomnia](https://insomnia.rest/) - Cliente API
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI
- [VS Code](https://code.visualstudio.com/) - Editor
- [Postman](https://www.postman.com/) - API Testing

### Plataformas de Deploy
- [Heroku](https://www.heroku.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)
- [AWS](https://aws.amazon.com/)

---

## 💡 Tips & Tricks

### Setup Rápido
```bash
# 1. Clone e instale
git clone seu-repo.git && cd api-usuarios
npm install

# 2. Configure .env
cp .env.example .env
# Edite com seus valores

# 3. Inicie
npm run dev
```

### Testar API Rápido
```bash
# Terminal 1: Iniciar servidor
npm run dev

# Terminal 2: Executar exemplos
chmod +x EXAMPLES.sh && ./EXAMPLES.sh
```

### Debugging
```bash
# Ver logs em tempo real
tail -f logs/app-$(date +%Y-%m-%d).log

# Rodar testes com watch
npm run test:watch

# Com coverage
npm run test:coverage
```

---

## ❓ FAQ

**P: Por onde começo?**  
R: Leia [README.md](./README.md), depois [EXAMPLES.md](./EXAMPLES.md)

**P: Como faço deploy?**  
R: Veja [DEPLOYMENT.md](./DEPLOYMENT.md)

**P: Preciso contribuir com código?**  
R: Veja [CONTRIBUTING.md](./CONTRIBUTING.md)

**P: Qual é o status do projeto?**  
R: v1.0.0 ✅ Released. Veja [ROADMAP.md](./ROADMAP.md) para futuro

**P: Há segurança em produção?**  
R: Sim! Veja [QUALITY.md](./QUALITY.md#-segurança)

---

## 📞 Suporte

- 🐛 **Bug Reports**: Abra issue no GitHub
- 💡 **Feature Requests**: Abra discussion
- ❓ **Questions**: Veja documentação ou abra issue
- 🤝 **Contributions**: Veja [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🎓 Aprenda Enquanto Usa

Este projeto é um excelente exemplo de:
- ✅ Arquitetura MVC limpa
- ✅ Segurança em aplicações Node.js
- ✅ Testes com Jest
- ✅ Autenticação com JWT
- ✅ Validação com Joi
- ✅ Logging estruturado
- ✅ Error handling
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Docker deployment

---

## 🚀 Próximos Passos

1. **Entender**: Leia [README.md](./README.md) + [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Explorar**: Execute [EXAMPLES.md](./EXAMPLES.md)
3. **Testar**: Execute `npm test`
4. **Deploiar**: Use [DEPLOYMENT.md](./DEPLOYMENT.md)
5. **Contribuir**: Veja [ROADMAP.md](./ROADMAP.md) + [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📝 Changelog

**v1.0.0** - Janeiro 2024
- ✅ API completa
- ✅ Autenticação JWT
- ✅ Validação robusta
- ✅ Rate limiting
- ✅ Documentação completa
- ✅ 30+ testes (95% coverage)

**Próxima**: v1.0.1 (Febrero 2024)

---

**Última atualização**: Janeiro 2024  
**Mantido por**: [Diego](https://github.com/seu-usuario)

---

## 🎉 Bem-vindo ao Projeto!

Você está pronto para:
- ✅ Entender a arquitetura
- ✅ Usar a API
- ✅ Fazer deploy
- ✅ Contribuir

**Bom trabalho! 🚀**

---

**[← Voltar ao início](#-índice-de-documentação)**
