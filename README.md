# Protocol Starter

This is an official Protocol starter turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps

- `api`: an [ExpressJS](https://expressjs.com/) app
- `web`: another [Next.js](https://nextjs.org/) app

### Packages

- `database`: a [Prisma](https://www.prisma.io) package
- `ui`: a stub React component library shared by `web` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### API

The api app is a simple [ExpressJS](https://expressjs.com/) app that uses [Prisma](https://www.prisma.io) to connect to a PostgreSQL database. It also uses [TRPC](https://trpc.io) and exposes a REST API.

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd pxyz-starter-basic
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd pxyz-starter-basic
pnpm run dev
```

### URLS

- `api`: http://localhost:4000
- `api:rest`: http://localhost:4000/api
- `api:trpc`: http://localhost:4000/trpc
- `api:docs`: http://localhost:4000/docs
- `api:openapi.json`: http://localhost:4000/openapi.json
- `web`: http://localhost:3000
