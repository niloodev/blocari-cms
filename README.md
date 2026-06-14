# Codako CMS

CMS desenvolvido pela Codako utilizando tecnologias modernas para criar uma experiência de edição de conteúdo flexível e poderosa.

## 🛠 Tecnologias

- Next.js
- Styled Components
- Vitest
- Puck Editor
- MongoDB
- Docker

## 🚀 Configuração do Ambiente

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Git

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Porta da aplicação Next.js
NEXT_PORT=3000

# Tipo de execução: 'api' ou 'standalone'
TYPE=api

# Ambiente: 'development' ou 'production'
ENV=development

# Configurações MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=cms

# Informações API
API_URL=
```

### Modos de Execução

O CMS possui dois modos de execução:

- **standalone**: Executa com banco de dados MongoDB local
- **api**: Executa apenas o frontend, conectando-se a uma API externa

## 💻 Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
./run-dev.sh
```

Este script irá:

1. Verificar o TYPE no .env
2. Se TYPE=standalone: iniciar o container MongoDB
3. Executar npm run dev

## 🏗 Produção

Para ambiente de produção, utilize os profiles do Docker Compose:

### Modo Standalone (com MongoDB)

```bash
docker compose --profile standalone up
```

### Modo API (sem MongoDB)

```bash
docker compose --profile api up
```

## 🏛 Arquitetura

O projeto possui duas configurações principais:

### Modo Standalone

- Frontend Next.js
- MongoDB local
- Editor Puck integrado
- Gestão completa de conteúdo

### Modo API

- Frontend Next.js
- Conexão com API externa
- Editor Puck integrado
- Sem dependência de banco de dados local

## 📝 Comandos Úteis

```bash
# Instalar dependências
npm install

# Executar testes
npm run test

# Build do projeto
npm run build

# Iniciar em produção
npm run start
```

## 💾 Backup e Restore do MongoDB

### Como fazer backup

Para salvar um dump do banco de dados:

```bash
./dump_create.sh
```

### Como restaurar

Para restaurar um dump existente:

```bash
./dump_restore.sh
```

> **Notas**:
>
> - Os comandos de backup e restore só funcionam quando o serviço MongoDB está rodando (TYPE=standalone)
> - As credenciais são obtidas automaticamente do arquivo .env
> - Os arquivos de dump são salvos/lidos da pasta ./db/
> - Certifique-se de dar permissão de execução aos scripts: `chmod +x dump_*.sh`

## 📄 Licença

Este projeto é propriedade da Codako. Todos os direitos reservados.
