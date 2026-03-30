// app/my-favorites/page.tsx
import FavoritesGrid from '@/components/favorites/fovoriteGrid';
import { getFavoritesByLearnerId } from '@/services/course/course.server.service';

const MyFavoritesPage = async () => {
  const favoritesData = await getFavoritesByLearnerId();
  const favorites = favoritesData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Favorites</h1>
        <p className="text-slate-600">
          {favorites.length} {favorites.length === 1 ? 'course' : 'courses'}{' '}
          saved to your favorites
        </p>
      </div>

      <FavoritesGrid initialFavorites={favorites} />
    </div>
  );
};

export default MyFavoritesPage;
