// components/favorites/FavoriteCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Trash2, Loader2 } from 'lucide-react';
import { Favorite } from '@/types';
import { courseService } from '@/services/course/course.service';
import { toast } from 'sonner';

interface FavoriteCardProps {
  favorite: Favorite;
  onDelete: (favoriteId: string) => void;
}

const FavoriteCard = ({ favorite, onDelete }: FavoriteCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = 'delete-favorite';

    try {
      toast.loading('Removing from favorites...', { id: toastId });

      const res = await courseService.deleteFromFavorites(favorite.course_id);

      if (res.error) {
        toast.error(res.error.message, { id: toastId });
      } else {
        toast.success('Removed from favorites', { id: toastId });
        onDelete(favorite.id);
        router.refresh();
      }
    } catch (error) {
      toast.error('Failed to remove from favorites', { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Course Thumbnail */}
      <Link href={`/course/${favorite.course.id}`}>
        <div className="relative aspect-video bg-slate-100 cursor-pointer overflow-hidden">
          {favorite.course.thumbnail ? (
            <Image
              src={favorite.course.thumbnail}
              alt={favorite.course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-slate-300" />
            </div>
          )}
        </div>
      </Link>

      {/* Course Info */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/course/${favorite.course.id}`}>
          <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
            {favorite.course.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
          {favorite.course.description || 'No description available'}
        </p>

        {/* Meta Info - Rating REMOVED */}
        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {favorite.course.level || 'Beginner'}
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          {favorite.course.isFree ? (
            <span className="text-lg font-bold text-green-600">Free</span>
          ) : (
            <span className="text-lg font-bold text-slate-900">
              ${favorite.course.course_fee}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/course/${favorite.course.id}`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors"
          >
            Get Started
          </Link>

          {/* Improved Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-sm font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-red-200 hover:border-red-300"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
