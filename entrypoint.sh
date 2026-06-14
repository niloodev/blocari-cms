#!/bin/bash

echo "Aguardando o MongoDB iniciar..."

while ! nc -z ${MONGO_HOST} ${MONGO_PORT}; do
    sleep 1
done
echo "MongoDB iniciado"

npm run build

npm run start
