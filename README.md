*<a href="https://planningdev.vercel.app/">
<!-- <img src="https://github.com/Skolaczk/next-starter/assets/76774237/44b552ff-43aa-441f-b1d0-de9bdfc2a73f" alt="thubnail"> -->
</a>
<p align="center">
  <a href="#-features"><strong>Features</strong></a> ·
  <a href="#-deployment"><strong>Deployment</strong></a> ·
  <a href="#-getting-started"><strong>Getting started</strong></a> ·
  <a href="#%EF%B8%8F-scripts-overview"><strong>Scripts overview</strong></a> ·
  <a href="#-contribution"><strong>Contribution</strong></a> ·
  <a href="#%EF%B8%8F-support"><strong>Support</strong></a>
</p>

## 🎉 Features
- 🚀 Next.js 14 (App router)
- ⚛️ React 18
- 📘 Typescript
- 🎨 TailwindCSS - Class sorting, merging and linting
- 🛠️ Shadcn/ui - Customizable UI components
- 💵 Stripe - Payment handler
- 🔒 Next-auth - Easy authentication library for Next.js (GitHub provider)
- 🛡️ Prisma - ORM for node.js
- 📋 React-hook-form - Manage your forms easy and efficient 
- 🔍 Zod - Schema validation library
- 🧪 Jest & React Testing Library - Configured for unit testing
- 🎭 Playwright - Configured for e2e testing
- 📈 Absolute Import & Path Alias - Import components using `@/` prefix
- 💅 Prettier - Code formatter
- 🧹 Eslint - Code linting tool
- 🐶 Husky & Lint Staged - Run scripts on your staged files before they are committed
- 🔹 Icons - From Lucide
- 🌑 Dark mode - With next-themes
- 📝 Commitlint - Lint your git commits
- 🤖 Github actions - Lint your code on PR
- ⚙️ T3-env - Manage your environment variables
- 🗺️ Sitemap & robots.txt
- 💯 Perfect Lighthouse score
- 🌐 I18n with Paraglide

### Prepare husky
It is required if you want husky to work

```bash
pnpm prepare
```

### Run the dev server

You can start the server using this command:

```bash
pnpm dev
```

and open http://localhost:3000/ to see this app.

## 📁 Project structure

```bash
.
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── prisma                          # Prisma schema and migrations
├── public                          # Public assets folder
└── src
    ├── __tests__                   # Unit and e2e tests
    ├── actions                     # Server actions
    ├── app                         # Next JS App (App Router)
    ├── components                  # React components
    ├── hooks                       # Custom hooks
    ├── lib                         # Functions and utilities
    ├── styles                      # Styles folder
    ├── types                       # Type definitions
    ├── messages                    # Messages for i18n 
    ├── paraglide                   # (generated) compiled i18n messages 
    └── env.mjs                     # Env variables config file
```

## ⚙️ Scripts overview
The following scripts are available in the `package.json`:
- `dev`: Run development server
- `build`: Build the app
- `start`: Run production server
- `preview`: Run `build` and `start` commands together
- `lint`: Lint the code using Eslint
- `lint:fix`: Fix linting errors
- `format:check`: Checks the code for proper formatting
- `format:write`: Fix formatting issues
- `typecheck`: Type-check TypeScript without emitting files
- `test`: Run unit tests
- `test:watch`: Run unit tests in watch mode
- `e2e`: Run end-to-end tests
- `e2e:ui`: Run end-to-end tests with UI
- `postbuild`: Generate sitemap
- `prepare`: Install Husky for managing Git hooks