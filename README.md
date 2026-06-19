# Weather App

Next.js + TypeScript + Tailwind + ShadCN UI + PostgreSQL/Prisma weather app.

## Setup

```bash
npm install
cp .env.example .env
# fill in DATABASE_URL and OPENWEATHER_API_KEY in .env

npx prisma db push
npx prisma generate

npm run dev
```

Get a free API key at https://openweathermap.org/api

## Deploy

Push to GitHub, import into Vercel, set the env vars in Project Settings, and deploy.
Use a serverless-friendly Postgres host (Neon, Supabase, Vercel Postgres).
