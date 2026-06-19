export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
}

export function formatTemp(temp: number): string {
  return `${Math.round(temp)}°`;
}

export function formatTime(unixSeconds: number, timezoneOffsetSeconds: number): string {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function formatDay(unixSeconds: number, timezoneOffsetSeconds: number): string {
  const date = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
}

export function windDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
}
