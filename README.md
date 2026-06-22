# 🌤️ Weather App

A full-stack weather application that delivers real-time weather conditions and a 5-day forecast based on a user's geolocation or a manually searched city. Built with a modern, type-safe stack and deployed on Vercel.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5.20-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)
<!-- ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel) -->
[Vercel](https://wd-weather.vercel.app/)
---

## 📖 Overview

This application fetches live weather data from the **OpenWeatherMap API** and presents current conditions, a 5-day forecast, and additional metrics (humidity, wind, pressure, visibility, sunrise/sunset) in a clean, responsive UI. Users can search by city name, use browser geolocation, and save favorite locations, which are persisted in a **PostgreSQL** database via **Prisma ORM**.

---

## ✨ Features

- 🔍 **City Search** — Look up weather for any city worldwide
- 📍 **Geolocation Support** — Auto-detect weather based on the user's current location
- 📅 **5-Day Forecast** — Aggregated daily summaries from 3-hour interval data
- ⭐ **Favorites** — Save and manage favorite locations, persisted in PostgreSQL
- 🕓 **Search History Logging** — Every search is recorded server-side for future analytics/UI
- 🌗 **Dark / Light Mode** — Theme toggle with `localStorage` persistence
- ⚡ **Loading & Error States** — Skeleton loaders and graceful error handling (e.g., city not found)
- 📱 **Fully Responsive** — Optimized layout for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer            | Technology                          |
|-------------------|--------------------------------------|
| Frontend / Backend | [Next.js 14](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/) |
| Styling           | [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/) |
| Database          | [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech/)) |
| ORM               | [Prisma](https://www.prisma.io/) |
| External API      | [OpenWeatherMap API](https://openweathermap.org/api) |
| Deployment        | [Vercel](https://vercel.com/) |
| Icons             | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Structure

```
weather-app/
├── prisma/
│   └── schema.prisma          # Database schema (FavoriteLocation, SearchHistory)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── weather/route.ts
│   │   │   ├── favorites/route.ts
│   │   │   └── favorites/[id]/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                # ShadCN primitives (button, card, input, etc.)
│   │   ├── weather-search.tsx
│   │   ├── weather-display.tsx
│   │   ├── forecast-card.tsx
│   │   ├── favorites-list.tsx
│   │   └── theme-toggle.tsx
│   ├── lib/
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── utils.ts
│   │   └── weather-utils.ts
│   └── types/
│       └── weather.ts
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A PostgreSQL database (e.g., free instance on [Neon](https://neon.tech/) or [Supabase](https://supabase.com/))
- A free [OpenWeatherMap API key](https://openweathermap.org/api)

### 1. Clone the repository

```bash
git clone https://github.com/ishaan-ranjan16/PRODIGY_WD_05.git
cd PRODIGY_WD_05
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Update `.env` with your own credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public&sslmode=require"
OPENWEATHER_API_KEY="your_openweathermap_api_key"
```

### 4. Push the Prisma schema to your database

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Schema

| Model              | Description                                      |
|---------------------|---------------------------------------------------|
| `FavoriteLocation`  | Stores user-saved cities (city, country, lat/lon) |
| `SearchHistory`     | Logs every weather search performed               |

View and edit data visually with:

```bash
npx prisma studio
```

---

## ☁️ Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com/new).
3. Add environment variables in **Project Settings → Environment Variables**:
   - `DATABASE_URL`
   - `OPENWEATHER_API_KEY`
4. Deploy — Vercel automatically runs `prisma generate` via the `postinstall` script.

> 💡 If using Neon, ensure the connection string includes `?sslmode=require` for serverless compatibility.

---

## 📜 Available Scripts

| Command              | Description                          |
|-----------------------|----------------------------------------|
| `npm run dev`         | Start the development server          |
| `npm run build`       | Build the app for production          |
| `npm run start`       | Run the production build              |
| `npm run lint`        | Run ESLint                            |
| `npm run db:push`     | Push Prisma schema to the database    |
| `npm run db:studio`   | Open Prisma Studio                    |

---

## 🔐 Security Notes

- Never commit `.env` — it is excluded via `.gitignore`.
- `.env.example` should only ever contain placeholder values.
- Rotate API keys immediately if accidentally exposed in version control.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- UI components from [ShadCN UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)