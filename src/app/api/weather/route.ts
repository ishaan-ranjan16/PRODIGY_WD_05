import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { CurrentWeather, ForecastDay, WeatherResponse } from "@/types/weather";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Server misconfiguration: OPENWEATHER_API_KEY is missing." },
      { status: 500 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    let currentUrl: string;

    if (city) {
      currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    } else if (lat && lon) {
      currentUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
      return NextResponse.json(
        { error: "Provide either 'city' or 'lat' and 'lon' query params." },
        { status: 400 }
      );
    }

    const currentRes = await fetch(currentUrl, { cache: "no-store" });
    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        return NextResponse.json({ error: "City not found." }, { status: 404 });
      }
      return NextResponse.json({ error: "Failed to fetch weather data." }, { status: currentRes.status });
    }
    const currentData = await currentRes.json();

    const forecastUrl = `${BASE_URL}/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&appid=${API_KEY}`;
    const forecastRes = await fetch(forecastUrl, { cache: "no-store" });
    const forecastData = await forecastRes.json();

    const current: CurrentWeather = {
      cityName: currentData.name,
      country: currentData.sys.country,
      lat: currentData.coord.lat,
      lon: currentData.coord.lon,
      temp: currentData.main.temp,
      feelsLike: currentData.main.feels_like,
      tempMin: currentData.main.temp_min,
      tempMax: currentData.main.temp_max,
      humidity: currentData.main.humidity,
      pressure: currentData.main.pressure,
      windSpeed: currentData.wind.speed,
      windDeg: currentData.wind.deg,
      visibility: currentData.visibility,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
      timezone: currentData.timezone,
      dt: currentData.dt,
    };

    const dailyMap = new Map<string, ForecastDay & { count: number }>();
    for (const item of forecastData.list as any[]) {
      const dateKey = new Date(item.dt * 1000).toISOString().split("T")[0];
      const existing = dailyMap.get(dateKey);
      const hour = new Date(item.dt * 1000).getUTCHours();

      if (!existing) {
        dailyMap.set(dateKey, {
          date: item.dt,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          pop: item.pop ?? 0,
          count: 1,
        });
      } else {
        existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
        existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
        existing.pop = Math.max(existing.pop, item.pop ?? 0);
        if (hour >= 11 && hour <= 13) {
          existing.description = item.weather[0].description;
          existing.icon = item.weather[0].icon;
        }
      }
    }

    const forecast: ForecastDay[] = Array.from(dailyMap.values())
      .slice(0, 5)
      .map(({ count, ...rest }) => rest);

    prisma.searchHistory
      .create({
        data: {
          cityName: current.cityName,
          country: current.country,
          lat: current.lat,
          lon: current.lon,
        },
      })
      .catch(() => {});

    const response: WeatherResponse = { current, forecast };
    return NextResponse.json(response);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error fetching weather." }, { status: 500 });
  }
}
