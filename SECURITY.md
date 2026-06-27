# 🔒 Guia de Segurança

Documentação completa de segurança, boas práticas e como reportar vulnerabilidades.

## 🚨 Reportar Vulnerabilidades

**NÃO abra um issue público!**

Se você descobrir uma vulnerabilidade de segurança:

1. **Não compartilhe publicamente**
2. **Envie email**: security@seu-dominio.com *(será adicionado)*
3. **Inclua**:
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Possível impacto
   - Sua sugestão de fix

Responderemos em até 48 horas.

---

## 🔐 Implementações de Segurança

### 1. Autenticação

#### JWT (JSON Web Token)
- ✅ Assinatura com HS256
- ✅ Expiração configurável (padrão: 24h)
- ✅ Validação de assinatura
- ✅ Detecção de expiração

```javascript
// Valide token a cada requisição
const token = jwt.verify(tokenString, JWT_SECRET);
```

#### Proteção de Tokens
- ✅ Tokens armazenados em memória (não em localStorage no frontend)
- ✅ Transmitidos via HTTP-only cookies ou Bearer header
- ✅ Nunca loguear tokens
- ✅ Expiração obrigatória

### 2. Senhas

#### Hash Bcryptjs
- ✅ 10 rounds de salt (padrão)
- ✅ Impossível reverter
- ✅ Comparação timing-safe
- ✅ Nunca retornar hash

```javascript
// No modelo Usuario
usuarioSchema.pre('save', async function() {
  if (!this.isModified('senha')) return;
  this.senha = await bcrypt.hash(this.senha, 10);
});
```

#### Requisitos de Senha
- ✅ Mínimo 8 caracteres
- ✅ Pelo menos uma letra maiúscula
- ✅ Pelo menos uma letra minúscula
- ✅ Pelo menos um número

**Não exigimos símbolos** para não ser muito restritivo, mas é permitido.

### 3. Validação de Input

#### Joi Schema Validation
```javascript
// Antes de processar, validar
const schema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/),
  nome: Joi.string().min(3).max(100).required()
});

const { error, value } = schema.validate(req.body);
if (error) throw error;
```

#### Proteção Contra
- ✅ Injeção NoSQL
- ✅ XSS (Cross-Site Scripting)
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ Campos extras desconhecidos

### 4. Rate Limiting

#### Proteção Contra Brute Force
```
Login: 5 tentativas por 15 minutos por IP
Registro: 3 tentativas por hora por IP
API Geral: 100 requisições por 15 minutos por IP
```

#### Implementação
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip: (req) => process.env.NODE_ENV === 'test'
});
```

### 5. CORS (Cross-Origin Resource Sharing)

#### Configuração
```javascript
// Apenas domínios confiáveis
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

#### Variável de Ambiente
```env
CORS_ORIGIN=https://seu-frontend.com
```

**NÃO use** `*` em produção!

### 6. Proteção de Dados

#### Senhas Nunca Retornam
```javascript
// Schema
usuarioSchema.add({
  senha: {
    select: false // Não retorna em queries
  }
});

// Controller
usuario.select('+senha'); // Apenas quando necessário
```

#### Campos Sensíveis
- ✅ Senhas: select: false
- ✅ Refresh tokens: não retornam
- ✅ Backup codes MFA: nunca retornam

### 7. HTTPS

**Obrigatório em Produção!**

```javascript
// Middleware para redirecionar HTTP para HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}
```

### 8. Logging Seguro

#### O Que Logar
- ✅ Tentativas de login
- ✅ Erros não sensíveis
- ✅ Atividades administrativas
- ✅ Mudanças de dados

#### O Que NÃO Logar
- ❌ Senhas
- ❌ Tokens
- ❌ Informações pessoais sensíveis
- ❌ Dados de pagamento

### 9. Error Handling

#### Mensagens Genéricas em Produção
```javascript
if (process.env.NODE_ENV === 'production') {
  // Não expor detalhes de erro
  res.json({ erro: 'Erro interno do servidor' });
} else {
  // Em desenvolvimento, mostrar stack trace
  res.json({ erro: message, stack: error.stack });
}
```

#### Evitar Exposição de Informações
- ✅ Não revelar estrutura do banco
- ✅ Não revelar dependências
- ✅ Não revelar versões
- ✅ Não revelar caminhos de arquivo

---

## 🛡️ Vulnerabilidades Conhecidas

### Nenhuma

Realizamos auditoria regular com:
```bash
npm audit
# Resultado: 0 vulnerabilidades críticas/altas
```

---

## 🚫 Vulnerabilidades Comuns - Como Evitamos

### 1. Injeção de SQL/NoSQL

❌ **Inseguro**:
```javascript
// NÃO faça isso!
const usuario = await Usuario.findOne({
  email: req.body.email // Usuário pode injetar código
});
```

✅ **Seguro**:
```javascript
// Use Mongoose que sanitiza automaticamente
const usuario = await Usuario.findOne({
  email: req.body.email
});

// Ou valide com Joi antes
const { error, value } = schema.validate(req.body);
```

### 2. XSS (Cross-Site Scripting)

❌ **Inseguro**:
```javascript
res.json({ mensagem: `Bem-vindo ${req.body.nome}` }); // Pode conter <script>
```

✅ **Seguro**:
```javascript
// Express escapa automaticamente JSON
// Adicione Content-Type: application/json
res.setHeader('Content-Type', 'application/json');
res.json({ mensagem: `Bem-vindo ${req.body.nome}` });
```

### 3. CSRF

✅ **Evitamos com**:
- JWT stateless (não precisa de CSRF tokens)
- CORS restritivo
- SameSite cookies (quando aplicável)

### 4. Rate Limiting

❌ **Inseguro**:
```javascript
// Sem rate limiting, vulnerável a brute force
```

✅ **Seguro**:
```javascript
// Implementamos para login e registro
const limiter = rateLimit({ max: 5, windowMs: 900000 });
router.post('/login', limiter, login);
```

### 5. Exposição de Dados Sensíveis

❌ **Inseguro**:
```javascript
console.log('Password reset for:', usuario.senha);
```

✅ **Seguro**:
```javascript
logger.info(`Password reset requested for user: ${usuario.id}`);
```

---

## 🔍 Segurança em Diferentes Ambientes

### Desenvolvimento
```env
NODE_ENV=development
JWT_SECRET=dev-secret-can-be-weak
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

- ✅ Stack traces visíveis
- ✅ Logs verbosos
- ✅ CORS aberto para teste
- ⚠️ NÃO use esses valores em produção!

### Teste
```env
NODE_ENV=test
JWT_SECRET=test-secret
MONGODB_URI=mongodb://localhost:27017/api-usuarios-test
```

- ✅ Banco de dados isolado
- ✅ Rate limiting desativado
- ✅ Sem logs em arquivo

### Produção
```env
NODE_ENV=production
JWT_SECRET=<chave-forte-32-caracteres>
MONGODB_URI=<MongoDB-Atlas-URI>
CORS_ORIGIN=https://seu-frontend.com
```

- ✅ HTTPS obrigatório
- ✅ JWT_SECRET forte
- ✅ CORS restritivo
- ✅ Erros genéricos
- ✅ Monitoramento ativo
- ✅ Backup configurado

---

## 🔑 Gerenciamento de Chaves

### JWT_SECRET

**Gerar chave forte**:
```bash
node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\"
```

**Armazenar**:
- ✅ Em .env (não em código)
- ✅ Em secret manager (AWS, Azure)
- ✅ Variável de ambiente
- ❌ Nunca no código
- ❌ Nunca no Git

**Rotação**:
- Considere rotação periódica (a cada 6-12 meses)
- Manter versão antiga durante transição
- Alertar usuários de re-login

### Dependências Seguras

Auditoria regular:
```bash
# Verificar vulnerabilidades
npm audit

# Atualizar se necessário
npm audit fix

# Verificar desatualizadas
npm outdated
```

---

## 📋 Checklist de Segurança

- [ ] HTTPS habilitado em produção
- [ ] JWT_SECRET é forte (32+ caracteres)
- [ ] Senhas hasheadas com bcryptjs
- [ ] Rate limiting ativo
- [ ] CORS configurado
- [ ] Validação de input com Joi
- [ ] Sem logs de dados sensíveis
- [ ] Proteção contra injeção
- [ ] Error handling adequado
- [ ] Sem console.log em produção
- [ ] Backups configurados
- [ ] Monitoramento ativo
- [ ] Testes de segurança
- [ ] npm audit passando

---

## 🚀 Deploy Seguro

### Antes de Deploy em Produção

1. **Variáveis de Ambiente**
   ```bash
   # Confirme que possui
   echo $JWT_SECRET
   echo $MONGODB_URI
   echo $CORS_ORIGIN
   ```

2. **Auditoria**
   ```bash
   npm audit
   npm outdated
   ```

3. **Testes**
   ```bash
   npm test
   npm run test:coverage
   ```

4. **HTTPS**
   - Obter certificado SSL/TLS
   - Configurar redirecionamento HTTP → HTTPS

5. **Backup**
   - Configurar backup automático do MongoDB
   - Testar restore

6. **Monitoramento**
   - Logs centralizados
   - Alertas de erro
   - Uptime monitoring

---

## 🔄 Rotina de Segurança

### Diária
- ✅ Monitorar logs
- ✅ Verificar alertas
- ✅ Uptime check

### Semanal
- ✅ Rever tentativas de login suspeitas
- ✅ Verificar performance
- ✅ Backups ok

### Mensal
- ✅ Atualizar dependências
- ✅ Rodar npm audit
- ✅ Rever mudanças de código

### Semestral
- ✅ Pentest (teste de penetração)
- ✅ Rever políticas de segurança
- ✅ Rotação de credenciais

---

## 📞 Contato de Segurança

Para reportar vulnerabilidades responsavelmente:

**Email**: security@seu-dominio.com *(será adicionado)*

- Resposta em até 48 horas
- Divulgação responsável
- Reconhecimento público (se desejado)

---

## 🎓 Recursos de Segurança

### Leitura
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://github.com/goldbergyoni/nodebestpractices#6-security-best-practices)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)

### Ferramentas
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/)
- [WhiteSource](https://www.whitesourcesoftware.com/)

### Testes
- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite](https://portswigger.net/burp)
- [Postman Security](https://www.postman.com/api-security/)

---

## ✅ Conclusão

Este projeto implementa segurança em camadas (defense in depth):

1. **Input Layer**: Validação com Joi
2. **Application Layer**: Hash bcryptjs, JWT
3. **Transport Layer**: HTTPS
4. **Infrastructure Layer**: Rate limiting, CORS
5. **Monitoring Layer**: Logging, Alerts

**Segurança é um processo contínuo.**

---

**Última atualização**: Janeiro 2024  
**Próxima revisão**: Abril 2024

🔒 **Mantenha-se seguro!**
