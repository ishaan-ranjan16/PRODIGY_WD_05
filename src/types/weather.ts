export interface CurrentWeather {
  cityName: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  description: string;
  icon: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  dt: number;
}

export interface ForecastDay {
  date: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pop: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface FavoriteLocation {
  id: string;
  cityName: string;
  country: string;
  lat: number;
  lon: number;
  createdAt: string;
}
