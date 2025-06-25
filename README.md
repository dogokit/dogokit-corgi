<div align="center">
	<h1 align="center">🐶Dogokit Corgi</h1>
  <p align="center">
    <span>React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui</span>
    <br />
    <a href="https://corgi.dogokit.com">🚧 Live Demo</a>
  </p>
</div>

## Goal

[Dogokit Corgi](https://github.com/dogokit/dogokit-corgi) is the implementation details of [Dogokit Akita](https://github.com/dogokit/dogokit-akita). This template is optimized for the shortest time to production, but with long-term development as well.

### Tech Stack and Setup

Core:

- [x] [React v19](https://react.dev)
- [x] [React Router v7 Framework (Remix)](https://reactrouter.com)
  - [x] [Themes: System, Light, Dark](https://github.com/abereghici/remix-themes)
  - [x] Integration with tRPC and Better Auth
  - [x] [Vercel Config](https://vercel.com/docs/frameworks/react-router), can be removed if not needed
- [x] [tRPC v11](https://trpc.io)
- [x] [Prisma ORM v6](https://prisma.io)
- [x] [Tailwind CSS v4](https://tailwindcss.com)
  - [x] [`shadcn/ui`](https://ui.shadcn.com) with single [`radix-ui`](https://radix-ui.com)
  - [ ] More from [Kibo UI](https://kibo-ui.com), [Origin UI](https://originui.com)
  - [ ] [React Email v4](https://react.email)
- [x] [Zod v4](https://zod.dev) & [Conform v1](https://conform.guide)
- [x] [Better Auth v1](https://better-auth.com)
- [ ] [Unpic](https://unpic.pics)

Config:

- [x] [TypeScript](https://typescriptlang.org)
- [x] [Bun v1](https://bun.sh)
- [x] [Biome v2](https://biomejs.dev)
  - [x] [Ultracite](https://ultracite.ai)
- [x] [Vite v7](https://vitejs.dev)
  - [x] [t3-env](https://env.t3.gg)
- [ ] [Vitest v3](https://vitest.dev)
- [x] [Docker v28](https://docker.com)
- [x] [PostgreSQL v17](https://postgresql.org)
- [ ] [Playwright](https://playwright.dev)
- [ ] [Storybook](https://storybook.js.org)
- [ ] [Turborepo](https://turbo.build)

Optional:

- [x] [VS Code: Settings and Extensions](https://code.visualstudio.com/docs/configure/settings)
- [x] [Cursor: Rules](https://docs.cursor.com/context/rules)
- [ ] Email: [Resend](https://resend.com), [Amazon SES](https://aws.amazon.com/ses)
- [ ] File Upload & Image: [Uploadcare](https://uploadcare.com), [Cloudflare R2](https://cloudflare.com/products/r2), [Imgix](https://imgix.com)
- [ ] Payment: [Polar](https://polar.sh)
- [ ] Error Tracking: [Sentry](https://sentry.io)
- [ ] Analytics: [Posthog](https://posthog.com)
- [ ] Security: [Arcjet](https://arcjet.com)
- [ ] API Key: [Unkey](https://unkey.dev)
- [ ] Documentation: [Fumadocs](https://fumadocs.com)
- AI Agents
  - [ ] General: [Codegen](https://codegen.com)
  - [ ] Code Review: [CodeRabbit](https://coderabbit.ai)

## Get Started

### Setup Dependencies

Use [Bun](https://bun.sh) for dependency management and scripts. Ensure [Bun is installed](https://bun.sh/docs/installation):

```sh
curl -fsSL https://bun.sh/install | bash
```

Install dependencies:

```sh
bun install
```

### Code Quality

Check, format, lint to ensure the setup is fine:

```sh
bun check
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

Required:

- `VITE_APP_URL`
- `BETTER_AUTH_SECRET`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_HOST_PORT`
- `DATABASE_URL`

Optional:

- `*_CLIENT_ID` and `*_CLIENT_SECRET`: For OAuth related, [check Guide: OAuth](./docs/GUIDE_OAUTH.md)
- `*_ACCESS_TOKEN` and `*_WEBHOOK_SECRET` for payment related.

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

Open <http://localhost:8000> then we're ready

### Production Deployment

Pick a host to deploy it to, such as:

- Vercel
- Netlify
- Render.com
- Railway.com
- Fly.io
- Google Cloud (GCP)
- Amazon Web Services (AWS)
- Microsoft Azure
- VPS with Coolify, Dokploy, etc

Then setup accordingly.

For example, if not using Vercel, remove `vercelPreset` in `react-router.config.ts`.

It's also recommended to use secret management for environment variables, such as:

- Doppler
- Infisical

### Production Build

Check if the production build is fine:

```sh
bun run build
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
- [shadcn Registries](https://shadcn-registries.vercel.app)
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
