import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ForecastDay } from "@/types/weather";
import { getWeatherIconUrl, formatTemp, formatDay } from "@/lib/weather-utils";

export function ForecastCard({ forecast, timezone }: { forecast: ForecastDay[]; timezone: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center hover:bg-accent transition-colors"
          >
            <div className="text-sm font-medium">{formatDay(day.date, timezone)}</div>
            <Image src={getWeatherIconUrl(day.icon)} alt={day.description} width={56} height={56} />
            <div className="text-xs text-muted-foreground capitalize">{day.description}</div>
            <div className="text-sm">
              <span className="font-semibold">{formatTemp(day.tempMax)}</span>{" "}
              <span className="text-muted-foreground">{formatTemp(day.tempMin)}</span>
            </div>
            {day.pop > 0 && (
              <div className="text-xs text-blue-500">{Math.round(day.pop * 100)}% rain</div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
