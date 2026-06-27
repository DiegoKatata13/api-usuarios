# 🏗️ Arquitetura do Projeto

## Visão Geral

Esta é uma API REST seguindo o padrão **MVC (Model-View-Controller)** com separação clara de responsabilidades. A aplicação está estruturada para ser escalável, testável e fácil de manter.

## Estrutura em Camadas

```
┌─────────────────────────────────────────────┐
│          Express.js Application             │
├─────────────────────────────────────────────┤
│  Routes (authRoutes, usuarioRoutes)         │  ← Definição de endpoints
├─────────────────────────────────────────────┤
│  Middlewares                                 │  ← Autenticação, Validação, Logging, CORS
│  - autenticar (JWT)                         │
│  - validar (Joi)                            │
│  - errorHandler (Tratamento de erros)       │
│  - Rate Limiting                            │
├─────────────────────────────────────────────┤
│  Controllers                                 │  ← Lógica de negócio
│  - authController                           │
│  - usuarioController                        │
├─────────────────────────────────────────────┤
│  Models                                      │  ← Schema e validação Mongoose
│  - Usuario                                  │
├─────────────────────────────────────────────┤
│  Database                                    │  ← Conexão MongoDB
├─────────────────────────────────────────────┤
│  Utils                                       │  ← Funções auxiliares
│  - logger (Logging)                         │
│  - validators (Schemas Joi)                 │
└─────────────────────────────────────────────┘
```

## Fluxo de uma Requisição

### Requisição de Registro

```
1. POST /auth/registrar
       ↓
2. Middlewares (Express JSON, CORS, Rate Limiting, Logging)
       ↓
3. Middleware de Validação (Joi Schema)
       ↓
4. authController.registrar()
       ├→ Validar se email já existe
       ├→ Criar usuário (pre-save hash de senha)
       └→ Retornar usuário criado
       ↓
5. Response 201 + usuário
```

### Requisição Autenticada

```
1. GET /usuarios/perfil
   Header: Authorization: Bearer <token>
       ↓
2. Middlewares (Express JSON, CORS, Rate Limiting, Logging)
       ↓
3. Middleware autenticar (Validar JWT)
       ├→ Extrair token do header
       ├→ Verificar assinatura
       └→ Adicionar usuarioId ao req
       ↓
4. usuarioController.verPerfil()
       ├→ Buscar usuário no MongoDB
       └→ Retornar dados públicos
       ↓
5. Response 200 + usuário
```

## Padrões de Projeto Utilizados

### 1. **MVC (Model-View-Controller)**
- **Model**: Define estrutura dos dados (Usuario.js)
- **Controller**: Lógica de negócio (authController.js, usuarioController.js)
- **View**: Resposta JSON (Express envolvendo)

### 2. **Middleware Pattern**
- Cada middleware tem uma responsabilidade específica
- Executados em cadeia (chain of responsibility)
- Exemplo: autenticar → validar → controller → response

### 3. **Dependency Injection**
- Middlewares recebem (req, res, next) como parâmetros
- Controllers recebem dados via req.body, req.params
- Reutilização de funções helpers

### 4. **Error Handling**
- Try-catch em controllers
- Middleware global de erro (errorHandler)
- Respostas padronizadas

## Decisões Arquiteturais

### ✅ Por que Mongoose ao invés de driver nativo?
- ODM reduz boilerplate
- Validação nativa no schema
- Middleware pre/post hooks
- Population de referências

### ✅ Por que Joi ao invés de validação no Model?
- Separação de concerns
- Reutilização em múltiplos controllers
- Mensagens de erro customizáveis
- Schemas mais claros e centralizados

### ✅ Por que Rate Limiting em middleware?
- Proteção em nível HTTP
- Configurável por rota
- Eficiência (rejeita cedo)

### ✅ Por que Logger dedicado?
- Centralização de logs
- Rastreamento de operações
- Facilita debugging em produção

## Fluxo de Autenticação com JWT

```
┌─ Registro/Login ─┐
│                  │
└── → Gerar JWT ←──┘
        ↓
   TOKEN: {
     id: usuarioId,
     email: email,
     iat: timestamp,
     exp: timestamp + 24h
   }
        ↓
┌─ Requisições Subsequentes ─┐
│                             │
Header: Bearer <TOKEN>
        ↓
Middleware autenticar:
  - Extrai token
  - Verifica assinatura
  - Valida expiração
  - Adiciona req.usuarioId
        ↓
Controller acessa req.usuarioId
        ↓
└─ Operação autorizada ─┘
```

## Melhorias Futuras

### Curto Prazo
- [ ] Refresh tokens
- [ ] Soft delete para usuários
- [ ] Auditoria de ações

### Médio Prazo
- [ ] OAuth 2.0 (Google, GitHub)
- [ ] Autenticação multi-fator (MFA)
- [ ] Recuperação de senha

### Longo Prazo
- [ ] Cache com Redis
- [ ] Message Queue (RabbitMQ)
- [ ] Microserviços
- [ ] GraphQL

## Escalabilidade

### Horizontal
- Stateless (JWT não requer session)
- Load balancer pode distribuir requisições
- MongoDB replicaset

### Vertical
- Cache com Redis
- Índices no MongoDB
- Otimização de queries

## Segurança

### Implementado
- ✅ HTTPS (em produção)
- ✅ Rate limiting
- ✅ CORS configurável
- ✅ JWT com expiração
- ✅ Hash bcryptjs
- ✅ Validação de input

### Recomendações
- Use HTTPS em produção
- Rotacione JWT_SECRET periodicamente
- Configure CORS restritivamente
- Use MongoDB Atlas com auth
- Monitore logs suspeitos

---

**Última atualização**: Janeiro 2024
