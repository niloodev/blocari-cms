<h1 align="center">
  <br>
     <img src="./src/app/icon.svg" alt="Blocari CMS" width="20%">
  <br>
    Blocari CMS
  <br>
</h1>

<h4 align="center">An open-source, block-based CMS for visually building and editing pages, built with <a href="https://nextjs.org/" target="_blank">Next</a> and the <a href="https://puckeditor.com/" target="_blank">Puck</a> visual editor.</h4>

<p align="center">
  <a href="#about">About</a> •
  <a href="#setup">Setup</a> •
  <a href="#production">Production</a> •
  <a href="#backup--restore">Backup & Restore</a> •
  <a href="#tools">Tools</a> •
  <a href="#author">Author</a>
</p>

## About

- A drag-and-drop, block-based editor (powered by Puck) to compose and manage page content visually.
- Runs in two modes, selected via the `TYPE` environment variable:
  - **standalone**: full app with a local MongoDB instance for content persistence.
  - **api**: frontend only, connecting to an external API (no local database).
- Images are uploaded straight from the editor and persisted, with a built-in gallery.
- Structured following the Atomic Design methodology.
- Unit tested with Vitest.

## Setup

- Follow the usual flow of a Next.js project.
- Node version 20 or above, plus Docker and Docker Compose.
- Run (`npm install`) to install the packages.
- Create a `.env` file at the project root:

```env
# Next.js application port
NEXT_PORT=3000

# Run mode: 'api' or 'standalone'
TYPE=api

# Environment: 'development' or 'production'
ENV=development

# MongoDB settings
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=cms

# API info
API_URL=
```

- Use (`./run-dev.sh`) to start in development mode. The script checks `TYPE` in `.env`, spins up the MongoDB container when `TYPE=standalone`, and runs `npm run dev`.
- If you want, you can run (`npm run build` with `npm run start`) to start in production mode.

## Production

For production, use the Docker Compose profiles:

```bash
# Standalone mode (with MongoDB)
docker compose --profile standalone up

# API mode (without MongoDB)
docker compose --profile api up
```

## Backup & Restore

> Backup and restore only work while the MongoDB service is running (`TYPE=standalone`). Credentials are read automatically from `.env`, and dump files are saved/read from the `./db/` folder. Make sure the scripts are executable: `chmod +x dump_*.sh`.

```bash
# Create a database dump
./dump_create.sh

# Restore an existing dump
./dump_restore.sh
```

## Tools

This application uses the following open-source packages:

##### Core ones.

- [Next](https://nextjs.org/) (Framework)
- [TypeScript](https://www.typescriptlang.org/) (Strongly typed programming language that builds on JavaScript)
- [Puck](https://puckeditor.com/) (Visual, block-based editor)

##### Stylization.

- [Styled Components](https://styled-components.com/) (CSS in JS / TS styling)
- [HeroUI](https://www.heroui.com/) (React UI component library)

##### Data & Forms

- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) (Database and ODM)
- [React Hook Form](https://react-hook-form.com/) (Form state management)
- [Zod](https://zod.dev/) (Schema validation)

##### Testing

- [Vitest](https://vitest.dev/) (Blazing fast unit test framework)

##### Code formatter, and other environment development tools.

- [ESLint](https://eslint.org/) (Javascript [linter](https://sourcelevel.io/blog/what-is-a-linter-and-why-your-team-should-use-it))
- [Prettier](https://prettier.io/) (Opinionated code formatter)
- [Husky](https://www.npmjs.com/package/husky) (Commit automation, runs unit tests before commiting)
- [Docker](https://www.docker.com/) (Containerization for both run modes)

## Author

**made by niloodev | Ezequiel Nilo**

Distributed under the **MIT** license. See [`LICENSE`](./LICENSE) for more details.

**ANY TIPS OR FEEDBACK IS HIGHLY APPRECIATED! 🐸**

---
