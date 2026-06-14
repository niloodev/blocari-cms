#!/bin/bash

# Carrega as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
else
    echo "Arquivo .env não encontrado!"
    exit 1
fi

# Função para limpar recursos ao receber SIGINT (Ctrl+C)
cleanup() {
    echo -e "\n🛑 Encerrando os serviços..."
    if [ "${TYPE}" = "standalone" ]; then
        docker compose --profile standalone down
    fi
    exit 0
}

# Registra a função cleanup para ser chamada quando receber SIGINT
trap cleanup SIGINT

echo "🚀 Iniciando ambiente de desenvolvimento..."
echo "📦 Modo: ${TYPE}"

# Verifica se é modo standalone para iniciar o MongoDB
if [ "${TYPE}" = "standalone" ]; then
    echo "🔄 Iniciando MongoDB..."
    docker compose --profile standalone up db -d

    # Aguarda o MongoDB estar pronto
    echo "⏳ Aguardando MongoDB iniciar..."
    while ! docker compose exec db mongosh --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
        sleep 1
    done
    echo "✅ MongoDB está pronto!"
fi

# Instala dependências se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências..."
    npm install
fi

echo "🎯 Iniciando aplicação em modo desenvolvimento..."
npm run dev
