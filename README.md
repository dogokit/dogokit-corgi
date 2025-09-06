<div align="center">
	<h1 align="center">🐶Dogokit Corgi</h1>
  <p align="center">
    <span>React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui</span>
    <br />
    <a href="https://dogokit-corgi.allnimal.com">🚧 Live Demo</a>
  </p>
</div>

## Goal

[Dogokit Corgi](https://github.com/dogokit/dogokit-corgi) is the implementation details of [Dogokit Akita](https://github.com/dogokit/dogokit-akita).

This template is optimized for the shortest time to production, but with long-term development as well.

### Tech Stack and Setup

Core:

- [x] [TypeScript v5.8](https://typescriptlang.org)
  - [x] Optional: [TypeScript v7 with `tsgo` setup](https://github.com/microsoft/typescript-go)
- [x] [Bun v1](https://bun.sh) (replace Node.js and npm)
- [x] [React v19](https://react.dev)
- [x] [React Router v7 Framework (Remix)](https://reactrouter.com)
  - [x] Integration with tRPC and Better Auth
  - [x] [Themes: System, Light, Dark](https://github.com/abereghici/remix-themes)
  - [x] [Vercel Config](https://vercel.com/docs/frameworks/react-router), can be removed if not needed
- [x] [Tailwind CSS v4](https://tailwindcss.com)
  - [x] [`shadcn/ui`](https://ui.shadcn.com) with single [`radix-ui`](https://radix-ui.com) and some with [`base-ui`](https://base-ui.com)
  - [x] Replace `lucide-react` with `sly` CLI to manage icons
  - [x] More components with [Kibo UI](https://kibo-ui.com), [Origin UI](https://originui.com), [React Bits](https://reactbits.dev), MVPBlocks, SHSF UI, Skiper UI
  - [ ] [React Email v4](https://react.email)
  - [ ] [TipTap v2](https://tiptap.dev)
- [x] [tRPC v11](https://trpc.io)
- [x] [Zod v4](https://zod.dev)
- [x] [Conform v1](https://conform.guide)
- [x] [Prisma ORM v6](https://prisma.io)
  - [x] Prisma Accelerate
  - [x] Prisma Postgres
- [x] [PostgreSQL v17](https://postgresql.org)
- [x] [Better Auth v1](https://better-auth.com)
  - [x] Email and Password
  - [x] OAuth: Google, GitHub
- [ ] [Unpic](https://unpic.pics)

Utilities:

- [x] Formatter and Linter: [Biome v2](https://biomejs.dev)
  - [x] Preset: [Ultracite](https://ultracite.ai)
- [x] Container: [Docker v28](https://docker.com)
- [x] Bundler: [Vite v7](https://vitejs.dev)
  - [x] Env: [t3-env](https://env.t3.gg)
- [x] Git Hooks: [Husky v9](https://typicode.github.io/husky)
- [ ] Testing Framework: [Vitest v3](https://vitest.dev)
- [ ] ENd-to-End Testing: [Playwright](https://playwright.dev)
- [x] Add Code, Not Dependencies: [Sly CLI](https://sly-cli.fly.dev)
- [x] Maintainable Source Registries: [jsrepo](https://jsrepo.dev)

Services:

- [x] Code Editor Settings and Extensions
  - [x] [VS Code / Cursor / Windsurf](https://code.visualstudio.com/docs/configure/settings)
- [x] AI Rules
  - [x] [Cursor](https://docs.cursor.com/context/rules)
  - [x] [Windsurf](https://windsurf.com/editor/directory)
- [ ] AI Toolkits and Frameworks
  - [ ] [AI SDK](https://ai-sdk.dev)
  - [ ] [Mastra](https://mastra.ai)
  - [ ] [Context7](https://context7.com)
- [ ] Rate Limiter: [Unkey](https://unkey.dev)
- [ ] Error Tracking: [Sentry](https://sentry.io)
- [ ] Email: [Resend](https://resend.com), [Amazon SES](https://aws.amazon.com/ses)
- [ ] Payment: [Polar](https://polar.sh)
- [ ] File Upload & Image: [Uploadcare](https://uploadcare.com), [Cloudflare R2](https://cloudflare.com/products/r2), [Imgix](https://imgix.com)
- [ ] Analytics: [Posthog](https://posthog.com)
- [ ] Security: [Arcjet](https://arcjet.com)
- [ ] API Key: [Unkey](https://unkey.dev)
- [ ] Documentation: [Fumadocs](https://fumadocs.com)
- AI Agents
  - [ ] General: [Codegen](https://codegen.com)
  - [ ] Code Review: [CodeRabbit](https://coderabbit.ai)

## Get Started

### Setup Dependencies

Use [Bun](https://bun.sh) for dependency management and scripts. It's an alternative to Node.js and npm.

Ensure [Bun is installed](https://bun.sh/docs/installation):

```sh
curl -fsSL https://bun.sh/install | bash
# or use any preferred installation methods
```

Install dependencies:

```sh
bun install
```

### Code Quality

Check, format, lint to ensure the setup is fine:

```sh
bun typecheck
```

If want to automatically format & lint the code:

```sh
bun write
```

### Environment Variables

Create the `.env` file from `.env.example`. This is only for local development, not production:

```sh
cp -i .env.example .env
```

Configure the required environment variables if on local, otherwise in the project settings on other environments.

If necessary, create the `.env.prod` for production info. Adjust accordingly if needed for `staging`, `test`, etc. Be careful to change the `URL` variables on different domains and subdomains.

```sh
cp -i .env.example .env.prod
```

Then change all the examples.

Required for application:

- `VITE_APP_NAME`
- `VITE_APP_URL`
- `DOMAIN`
- `BETTER_AUTH_SECRET`
- `DATABASE_URL`

Required when using Docker Compose:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_HOST_PORT`

Optional for OAuth and Payment:

- `*_CLIENT_ID` and `*_CLIENT_SECRET`: For OAuth related, [check docs on OAuth](./docs/oauth.md)
- `*_ACCESS_TOKEN` and `*_WEBHOOK_SECRET` for payment related.

Along with other variables.

### Database Setup

Prisma ORM is used to communicate with the database easily.

The default is PostgreSQL from local system, Docker container, or with services like Prisma Postgres, Neon, Supabase.

Start local database with Docker Compose:

```bash
bun db:up
```

Migrate database:

```sh
bun db:migrate
```

Seed initial data:

```sh
bun db:seed
```

Open Prisma Studio:

```sh
bun db:studio
```

Reset when needed:

```sh
bun db:reset
```

### Development

Run the development server:

```sh
bun dev
```

Open <http://localhost:8000> then we're ready.

Note: This repo has `.vscode/settings.json` which has `"files.exclude"` to hide some configs and build assets. Reconfigure it as needed.

### Production Deployment

Pick a host to deploy and setup accordingly, such as:

- [Railway.com](https://railway.com)
- [Render.com](https://render.com)
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Fly.io](https://fly.io)
- [Google Cloud (GCP)](https://cloud.google.com)
- [Amazon Web Services (AWS)](https://aws.amazon.com)
- [Microsoft Azure](https://azure.microsoft.com)
- VPS: [Coolify](https://coolify.io), [Dokploy](https://dokploy.com), etc

Notes:

- Railway supports `Dockerfile`.
  - Make sure to use [`Railpack`](https://railpack.com/languages/node/) to have the latest Node.js version.
  - Keep in mind the private network is not available during build time, so have to [migrate during pre-deploy](https://docs.railway.com/guides/pre-deploy-command)
- Render supports `Dockerfile`.
- Vercel needs `vercelPreset` in `react-router.config.ts`.
- It's recommended to use secret management for environment variables, such as [Doppler](https://doppler.com) or [Infisical](https://infisical.com).

### Production Build

Check if the production build is fine:

```sh
bun run build
```

Production build if using Docker (without database migration):

```sh
bun run build:docker
```

Migrate database for production:

```sh
bun db:migrate:deploy
```

Then run:

```sh
bun start
```

## References

- [shadcn/ui](https://ui.shadcn.com)
- [OriginUI](https://originui.com)
- [Kibo UI](https://kibo-ui.com)
- [registry.directory](https://registry.directory)
- [Better Auth: Demo](https://demo.better-auth.com)
- [`ayoubphy/react-router-trpc-prisma-better-auth`](https://github.com/ayoubphy/react-router-trpc-prisma-better-auth) is the original repo source

## Notes

### Credits

The codename ["Corgi" comes from a Welsh Corgi dog breed](https://britannica.com/animal/Welsh-Corgi) of affectionate small herding breed dog with short legs and a long body.

Originally created by [🧊Haidar](https://github.com/mhaidarhanif)

- [🐾Allnimal](https://allnimal.com)
- [🐻Bearmentor](https://bearmentor.com)
- [🐱Catamyst](https://catamyst.com)
- [🐶Dogokit](https://dogokit.allnimal.com)
- [🐘Elevanty](https://elevanty.allnimal.com)

### Tech Stack Comparison

What the tech stack choice replaces or each alternatives:

- TypeScript = Java, Go, Python, Ruby, PHP
- Bun = Node.js, Deno
- Biome = ESLint, Prettier
- React = Angular, Vue, Svelte
- React Router Framework = TanStack Router, Next.js, Nuxt
- tRPC = GraphQL, REST
- Prisma ORM = Drizzle, TypeORM, Sequelize, Mongoose
- Tailwind CSS = Bootstrap, MUI, Ant Design
- Zod = Joi, Yup
- Conform = TanStack Form, Formik, React Hook Form
- Better Auth = Passport.js, Auth0, Firebase Auth, Auth.js/NextAuth.js, Clerk
- Docker and Docker Compose = Manual install into OS
- PostgreSQL = MySQL, SQLite, MongoDB, DynamoDB, Firestore
- Vite = Webpack, Parcel
- Vitest = Jest, Mocha, Jasmine
- Resend or Amazon SES = SendGrid, Mailgun, Postmark, SMTP
- Uploadcare or Cloudflare R2 = Amazon S3, Cloudinary, MinIO, Firebase Storage
- Polar Payment = Stripe, PayPal, Braintree
