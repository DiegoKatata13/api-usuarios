# 🤝 Guia de Contribuição

## Bem-vindo!

Obrigado por seu interesse em contribuir para este projeto! Este documento fornece diretrizes para contribuir.

## Código de Conduta

- Seja respeitoso com os outros contribuidores
- Forneça feedback construtivo
- Focar em desempenho e qualidade do código

## Como Contribuir

### 1. Reportar Bugs

Antes de criar um bug report, verifique se o problema já foi reportado. Se encontrar seu bug descrito, adicione um comentário ao issue.

**Quando reportar um bug, inclua:**
- Título descritivo
- Descrição do comportamento esperado vs atual
- Passos para reproduzir
- Ambiente (Node version, OS, MongoDB version)

### 2. Sugerir Melhorias

Se você tem uma ideia de melhoria:
- Use título descritivo
- Forneça descrição detalhada
- Liste exemplos de como a melhoria seria usada
- Indique se é uma quebra de compatibilidade

### 3. Submeter Pull Request

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça suas mudanças
4. Adicione/atualize testes
5. Execute os testes localmente (`npm test`)
6. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
7. Push para a branch (`git push origin feature/AmazingFeature`)
8. Abra um Pull Request

## Padrões de Desenvolvimento

### Estilo de Código

- Use ES6+
- Nomes de variáveis descritivos em português
- Máximo 100 caracteres por linha
- Use async/await ao invés de callbacks

```javascript
// ✅ Bom
const buscarUsuarioPorId = async (usuarioId) => {
  try {
    const usuario = await Usuario.findById(usuarioId);
    return usuario;
  } catch (erro) {
    logger.error('Erro ao buscar usuário:', erro);
    throw erro;
  }
};

// ❌ Ruim
const GetUser = async (uid) => {
  const u = await Usuario.findById(uid);
  return u;
};
```

### Commits

- Use mensagens em português e descritivas
- Comece com ação (Add, Fix, Update, Remove)

```
✅ Bom:
- Add validação de email em authController
- Fix bug no rate limiting
- Update documentação de variáveis de ambiente

❌ Ruim:
- alterações
- fix
- corrigido
```

### Branches

- Feature: `feature/nome-descritivo`
- Bugfix: `bugfix/nome-do-bug`
- Hotfix: `hotfix/nome-critico`

```bash
# Exemplo
git checkout -b feature/refresh-tokens
git checkout -b bugfix/login-duplicado
```

### Testes

Sempre adicione/atualize testes para:
- Novas features
- Bug fixes
- Mudanças em comportamento

```javascript
// Formato esperado
describe('Nova Feature', () => {
  it('deve fazer X quando Y', async () => {
    // Arrange
    const entrada = { };
    
    // Act
    const resultado = await funcao(entrada);
    
    // Assert
    expect(resultado).toBe(esperado);
  });
});
```

- Mínimo 70% de cobertura
- Teste casos de sucesso E erro
- Use nomes descritivos

### Documentação

- Atualizar README.md para features visíveis
- Comentar código complexo
- Documentar funções públicas

```javascript
/**
 * Registra um novo usuário
 * @param {string} nome - Nome completo do usuário
 * @param {string} email - Email único do usuário
 * @param {string} senha - Senha com mínimo 8 caracteres
 * @returns {Promise<Object>} Usuário criado com id
 * @throws {Error} Se email já existe ou validação falha
 */
const registrar = async (nome, email, senha) => {
  // implementação
};
```

## Checklist para Pull Request

Antes de submeter um PR, garanta que:

- [ ] O código segue o estilo do projeto
- [ ] Os testes passam (`npm test`)
- [ ] Teste coverage > 70%
- [ ] Nenhuma console.log deixada para trás
- [ ] Comentários claros em código complexo
- [ ] Documentação atualizada
- [ ] Commits têm mensagens descritivas
- [ ] Sem conflitos com a branch main

## Processo de Revisão

1. Pelo menos um reviewer verificará
2. Feedback será fornecido via comments
3. Mudanças solicitadas devem ser feitas
4. Após aprovação, será feito merge

## Área de Desenvolvimento

### Setup Local

```bash
# 1. Clone seu fork
git clone https://github.com/seu-usuario/api-usuarios.git
cd api-usuarios

# 2. Instale dependências
npm install

# 3. Configure MongoDB local
# MongoDB deve estar rodando na porta 27017

# 4. Crie .env.test
cat > .env.test << EOF
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/api-usuarios-test
JWT_SECRET=test-secret
EOF

# 5. Execute testes
npm test

# 6. Inicie modo dev
npm run dev
```

### Debugging

```bash
# Com debugger do Node
node --inspect-brk src/server.js

# Com nodemon (deve estar configurado)
npm run dev

# Ver logs
tail -f logs/app-2024-01-15.log
```

### Testes

```bash
# Todos os testes
npm test

# Um arquivo específico
npm test -- tests/api.test.js

# Com watch
npm run test:watch

# Com cobertura
npm run test:coverage
```

## Estrutura de Pastas

```
src/
├── config/           # Configurações (banco de dados)
├── controllers/      # Lógica de negócio
├── middlewares/      # Middlewares Express
├── models/           # Schemas Mongoose
├── routes/           # Definição de rotas
├── utils/            # Utilitários (logger, validators)
├── app.js            # Setup Express
└── server.js         # Inicialização

tests/
└── api.test.js       # Suite de testes
```

## Ferramentas Recomendadas

- **Editor**: VS Code com Eslint plugin
- **Terminal**: PowerShell ou Bash
- **Cliente API**: Insomnia ou Postman
- **Database**: MongoDB Compass

## Dúvidas?

- Abra uma issue com tag `question`
- Verifique a documentação em README.md
- Consulte ARCHITECTURE.md para entender a estrutura

---

**Obrigado por contribuir! 🎉**
