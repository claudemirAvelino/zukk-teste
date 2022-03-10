# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

verificar as informações no .env para configurar o banco de dados

### Migrations

Run the following command to run startup migrations.
comando para gerar as tabelas no banco de dados
```js
adonis migration:run
```

```js
yarn start
```

