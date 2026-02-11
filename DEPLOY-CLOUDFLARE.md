# Deploy to Cloudflare Workers

This project is configured to deploy with OpenNext on Cloudflare Workers.

## 1. Prerequisites

- Cloudflare account with Workers enabled
- Domain added in Cloudflare (`jujutsuinfinitecodes.app`)
- Node.js 20.x (recommended)
- `pnpm` installed

## 2. Install and login

```bash
pnpm install
pnpm wrangler login
```

## 3. Create cache bucket (one-time)

`wrangler.jsonc` uses this bucket:

- `jujutsuinfinitecodes-cache`

Create it once:

```bash
pnpm wrangler r2 bucket create jujutsuinfinitecodes-cache
```

## 4. Set production environment variables in Cloudflare

Configure these in Workers settings:

- `NEXT_PUBLIC_SITE_URL=https://jujutsuinfinitecodes.app`
- `NEXT_PUBLIC_GOOGLE_ID=<your GA id>`
- `NEXT_PUBLIC_GOOGLE_ADSENSE_ID=<your Adsense id>`
- optional: `NEXT_PUBLIC_BAIDU_TONGJI`
- optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- optional: `NEXT_PUBLIC_PLAUSIBLE_SRC`

## 5. Deploy

```bash
pnpm deploy
```

## 6. GitHub auto deploy (already configured)

This repo includes:

- `.github/workflows/deploy-cloudflare.yml`

It deploys on every push to `main`.

Required GitHub Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_GOOGLE_ID`
- `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`
- optional: `NEXT_PUBLIC_BAIDU_TONGJI`
- optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- optional: `NEXT_PUBLIC_PLAUSIBLE_SRC`

For production routing, keep worker name and service binding aligned with `wrangler.jsonc`.
