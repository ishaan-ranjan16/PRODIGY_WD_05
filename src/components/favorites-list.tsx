"use client";

import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FavoriteLocation } from "@/types/weather";

interface FavoritesListProps {
  favorites: FavoriteLocation[];
  onSelect: (lat: number, lon: number) => void;
  onRemove: (id: string) => void;
}

export function FavoritesList({ favorites, onSelect, onRemove }: FavoritesListProps) {
  if (favorites.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Saved Locations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="flex items-center gap-1 rounded-full border bg-secondary pl-3 pr-1 py-1 text-sm"
          >
            <button onClick={() => onSelect(fav.lat, fav.lon)} className="hover:underline">
              {fav.cityName}, {fav.country}
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 rounded-full"
              onClick={() => onRemove(fav.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
