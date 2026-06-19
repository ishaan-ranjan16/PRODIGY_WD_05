"use client";

import Image from "next/image";
import { Droplets, Wind, Gauge, Eye, Sunrise, Sunset, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CurrentWeather } from "@/types/weather";
import { getWeatherIconUrl, formatTemp, formatTime, windDirection } from "@/lib/weather-utils";

interface WeatherDisplayProps {
  current: CurrentWeather;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function WeatherDisplay({ current, isFavorite, onToggleFavorite }: WeatherDisplayProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl text-white">
              {current.cityName}, {current.country}
            </CardTitle>
            <p className="text-sm text-blue-100 capitalize">{current.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 hover:text-white"
            onClick={onToggleFavorite}
          >
            <Star className={isFavorite ? "h-5 w-5 fill-yellow-400 text-yellow-400" : "h-5 w-5"} />
          </Button>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Image
            src={getWeatherIconUrl(current.icon)}
            alt={current.description}
            width={100}
            height={100}
            className="drop-shadow-lg"
          />
          <div>
            <div className="text-6xl font-bold">{formatTemp(current.temp)}</div>
            <div className="text-blue-100 text-sm">Feels like {formatTemp(current.feelsLike)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
        <Stat icon={<Droplets className="h-4 w-4" />} label="Humidity" value={`${current.humidity}%`} />
        <Stat
          icon={<Wind className="h-4 w-4" />}
          label="Wind"
          value={`${current.windSpeed} m/s ${windDirection(current.windDeg)}`}
        />
        <Stat icon={<Gauge className="h-4 w-4" />} label="Pressure" value={`${current.pressure} hPa`} />
        <Stat icon={<Eye className="h-4 w-4" />} label="Visibility" value={`${(current.visibility / 1000).toFixed(1)} km`} />
        <Stat
          icon={<Sunrise className="h-4 w-4" />}
          label="Sunrise"
          value={formatTime(current.sunrise, current.timezone)}
        />
        <Stat
          icon={<Sunset className="h-4 w-4" />}
          label="Sunset"
          value={formatTime(current.sunset, current.timezone)}
        />
        <div className="col-span-2 sm:col-span-3 flex gap-2 pt-2">
          <Badge variant="secondary">High {formatTemp(current.tempMax)}</Badge>
          <Badge variant="secondary">Low {formatTemp(current.tempMin)}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border p-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}
