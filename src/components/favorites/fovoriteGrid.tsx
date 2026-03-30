// components/favorites/FavoritesGrid.tsx
'use client';

import { useState } from 'react';
import { Favorite } from '@/types';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import FavoriteCard from './favoriteCard';

interface FavoritesGridProps {
  initialFavorites: Favorite[];
}

const FavoritesGrid = ({ initialFavorites }: FavoritesGridProps) => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleDelete = (favoriteId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl">
        <Heart className="w-12 h-12 text-slate-300 mb-3" />
        <h3 className="text-lg font-semibold text-slate-800">
          No favorites yet
        </h3>
        <p className="text-slate-500 text-center max-w-md mt-1">
          Start exploring courses and save your favorites to see them here
        </p>
        <Link
          href="/explore"
          className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((favorite) => (
        <FavoriteCard
          key={favorite.id}
          favorite={favorite}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default FavoritesGrid;
