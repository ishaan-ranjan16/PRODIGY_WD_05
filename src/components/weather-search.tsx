"use client";

import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface WeatherSearchProps {
  onSearchCity: (city: string) => void;
  onSearchCoords: (lat: number, lon: number) => void;
  loading: boolean;
}

export function WeatherSearch({ onSearchCity, onSearchCoords, loading }: WeatherSearchProps) {
  const [query, setQuery] = useState("");
  const [locating, setLocating] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearchCity(query.trim());
  }

  function handleGeolocate() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onSearchCoords(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => {
        alert("Unable to retrieve your location.");
        setLocating(false);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city... e.g. London, Tokyo, New York"
          className="pl-8"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={handleGeolocate} disabled={locating} title="Use my location">
        {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
      </Button>
    </form>
  );
}
