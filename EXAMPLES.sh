#!/bin/bash

# 📚 Script de Exemplos de Uso da API
# Execute este script para testar os endpoints da API

BASE_URL="http://localhost:3000"

echo "🚀 Exemplos de Uso da API REST"
echo "================================="
echo "Base URL: $BASE_URL"
echo ""

# ==================== 1. TESTE DA API ====================
echo "1️⃣  TESTANDO API"
echo "GET $BASE_URL/"
curl -X GET "$BASE_URL/" -H "Content-Type: application/json"
echo -e "\n\n"

# ==================== 2. REGISTRO ====================
echo "2️⃣  REGISTRANDO NOVO USUÁRIO"
echo "POST $BASE_URL/auth/registrar"
curl -X POST "$BASE_URL/auth/registrar" \
  -H "Content-Type: application/json" \
  -d '{
    \"nome\": \"João Silva\",
    \"email\": \"joao@example.com\",
    \"senha\": \"Senha@123\"
  }'
echo -e "\n\n"

# ==================== 3. REGISTRO COM EMAIL DUPLICADO ====================
echo "3️⃣  TENTANDO REGISTRAR COM EMAIL DUPLICADO"
echo "POST $BASE_URL/auth/registrar"
curl -X POST "$BASE_URL/auth/registrar" \
  -H "Content-Type: application/json" \
  -d '{
    \"nome\": \"Maria Silva\",
    \"email\": \"joao@example.com\",
    \"senha\": \"Senha@456\"
  }'
echo -e "\n\n"

# ==================== 4. REGISTRO COM VALIDAÇÃO INVÁLIDA ====================
echo "4️⃣  REGISTRANDO COM SENHA FRACA"
echo "POST $BASE_URL/auth/registrar"
curl -X POST "$BASE_URL/auth/registrar" \
  -H "Content-Type: application/json" \
  -d '{
    \"nome\": \"Pedro Santos\",
    \"email\": \"pedro@example.com\",
    \"senha\": \"senha123\"
  }'
echo -e "\n\n"

# ==================== 5. LOGIN ====================
echo "5️⃣  FAZENDO LOGIN"
echo "POST $BASE_URL/auth/login"
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    \"email\": \"joao@example.com\",
    \"senha\": \"Senha@123\"
  }')
echo "$RESPONSE"

# Extrair token do response (requer jq instalado)
if command -v jq &> /dev/null; then
  TOKEN=$(echo "$RESPONSE" | jq -r '.token')
  echo -e "\n✅ Token extraído: ${TOKEN:0:50}..."
else
  TOKEN=\"seu-token-jwt-aqui\"
  echo -e "\n⚠️  Copie o token da resposta acima"
fi
echo -e "\n"

# ==================== 6. ACESSAR PERFIL SEM TOKEN ====================
echo "6️⃣  ACESSANDO PERFIL SEM TOKEN"
echo "GET $BASE_URL/usuarios/perfil"
curl -X GET "$BASE_URL/usuarios/perfil" \
  -H "Content-Type: application/json"
echo -e "\n\n"

# ==================== 7. ACESSAR PERFIL COM TOKEN INVÁLIDO ====================
echo "7️⃣  ACESSANDO COM TOKEN INVÁLIDO"
echo "GET $BASE_URL/usuarios/perfil"
curl -X GET "$BASE_URL/usuarios/perfil" \
  -H \"Authorization: Bearer token-invalido\" \
  -H "Content-Type: application/json"
echo -e "\n\n"

# ==================== 8. ACESSAR PERFIL COM TOKEN VÁLIDO ====================
if [ \"$TOKEN\" != \"seu-token-jwt-aqui\" ]; then
  echo "8️⃣  ACESSANDO PERFIL COM TOKEN VÁLIDO"
  echo "GET $BASE_URL/usuarios/perfil"
  curl -X GET "$BASE_URL/usuarios/perfil\" \
    -H \"Authorization: Bearer $TOKEN\" \
    -H "Content-Type: application/json"
  echo -e "\n\n"

  # ==================== 9. ATUALIZAR PERFIL ====================
  echo "9️⃣  ATUALIZANDO PERFIL"
  echo "PUT $BASE_URL/usuarios/perfil"
  curl -X PUT "$BASE_URL/usuarios/perfil\" \
    -H \"Authorization: Bearer $TOKEN\" \
    -H "Content-Type: application/json" \
    -d '{
      \"nome\": \"João Silva Santos\"
    }'
  echo -e "\n\n"

  # ==================== 10. EXCLUIR CONTA ====================
  echo "🔟 EXCLUINDO CONTA"
  echo "DELETE $BASE_URL/usuarios/perfil"
  curl -X DELETE "$BASE_URL/usuarios/perfil\" \
    -H \"Authorization: Bearer $TOKEN\" \
    -H "Content-Type: application/json"
  echo -e "\n\n"
fi

echo "✅ Testes concluídos!"
