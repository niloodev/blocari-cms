#!/bin/bash

echo "Aguardando o MongoDB iniciar..."

while ! nc -z ${MONGO_HOST} ${MONGO_PORT}; do
    sleep 1
done
echo "MongoDB iniciado"

npm run build

# next start não lê NEXT_PORT. Passamos a porta/host explicitamente para o Next
# escutar exatamente na porta publicada pelo Docker (evita "loading infinito").
PORT_TO_USE="${PORT:-${NEXT_PORT:-3000}}"
echo "Iniciando Next em 0.0.0.0:${PORT_TO_USE}"
npm run start -- -p "${PORT_TO_USE}" -H 0.0.0.0
