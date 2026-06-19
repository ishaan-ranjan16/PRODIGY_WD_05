"use client";

import { useEffect, useState, useCallback } from "react";
import { CloudSun, AlertCircle } from "lucide-react";
import { WeatherSearch } from "@/components/weather-search";
import { WeatherDisplay } from "@/components/weather-display";
import { ForecastCard } from "@/components/forecast-card";
import { FavoritesList } from "@/components/favorites-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { WeatherResponse, FavoriteLocation } from "@/types/weather";

export default function HomePage() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/favorites");
      if (res.ok) setFavorites(await res.json());
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    loadFavorites();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
        () => fetchByCity("London")
      );
    } else {
      fetchByCity("London");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchByCity(city: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch weather.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchByCoords(lat: number, lon: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch weather.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleFavorite() {
    if (!weather) return;
    const existing = favorites.find(
      (f) => f.lat === weather.current.lat && f.lon === weather.current.lon
    );

    if (existing) {
      await fetch(`/api/favorites/${existing.id}`, { method: "DELETE" });
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cityName: weather.current.cityName,
          country: weather.current.country,
          lat: weather.current.lat,
          lon: weather.current.lon,
        }),
      });
    }
    loadFavorites();
  }

  async function removeFavorite(id: string) {
    await fetch(`/api/favorites/${id}`, { method: "DELETE" });
    loadFavorites();
  }

  const isFavorite = !!(
    weather && favorites.some((f) => f.lat === weather.current.lat && f.lon === weather.current.lon)
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-3xl py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudSun className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-bold">Weather App</h1>
          </div>
          <ThemeToggle />
        </div>

        <WeatherSearch onSearchCity={fetchByCity} onSearchCoords={fetchByCoords} loading={loading} />

        <FavoritesList favorites={favorites} onSelect={fetchByCoords} onRemove={removeFavorite} />

        {error && (
          <Card className="border-destructive/50">
            <CardContent className="flex items-center gap-2 py-4 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </CardContent>
          </Card>
        )}

        {loading && !weather && (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        )}

        {weather && (
          <div className="space-y-6">
            <WeatherDisplay
              current={weather.current}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
            <ForecastCard forecast={weather.forecast} timezone={weather.current.timezone} />
          </div>
        )}
      </div>
    </main>
  );
}
