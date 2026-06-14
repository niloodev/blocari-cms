#!/bin/bash

# Verifica se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

# Carrega as variáveis de ambiente do arquivo .env
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
else
    echo "❌ Arquivo .env não encontrado!"
    exit 1
fi

echo "📦 Criando backup do MongoDB..."

docker compose exec -T db mongodump \
    --archive --gzip \
    --db ${MONGO_DB} \
    --username ${MONGO_INITDB_ROOT_USERNAME} \
    --password ${MONGO_INITDB_ROOT_PASSWORD} \
    --authenticationDatabase admin > ./db/dump.gz

echo "✅ Backup criado com sucesso em ./db/dump.gz"