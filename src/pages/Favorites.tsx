import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { HeartIcon } from '@heroicons/react/24/solid';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode; gradient?: string }> = ({ title, icon, gradient }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className={`p-3 rounded-lg shadow-lg ${gradient || 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'}`}> 
      {icon}
    </div>
    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-pink-600 via-red-600 to-yellow-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
      {title}
    </h2>
  </div>
);

const Favorites: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = process.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const movies: Movie[] = [];

      try {
        for (const id of favorites) {
          const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
          );
          if (response.data.Response === 'True') {
            movies.push({
              imdbID: response.data.imdbID,
              Title: response.data.Title,
              Year: response.data.Year,
              Poster: response.data.Poster,
              Type: response.data.Type,
            });
          }
        }
        setFavoriteMovies(movies);
      } catch (err) {
        setError('An error occurred while fetching favorite movies');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [API_KEY]);

  const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');
  const isFavorite = (id: string) => getFavorites().includes(id);
  const handleToggleFavorite = (id: string) => {
    const favorites = getFavorites();
    let newFavorites: string[];
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId: string) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavoriteMovies((prev) => prev.filter((m) => newFavorites.includes(m.imdbID)));
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <SectionHeader title="Favorite Movies" icon={<HeartIcon className="h-8 w-8" />} />
      {favoriteMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img src="/empty-favorites.svg" alt="No favorites" className="w-40 h-40 mb-6 opacity-80" />
          <div className="text-xl font-semibold text-gray-500 mb-2">No favorites yet!</div>
          <div className="text-gray-400">Add movies to your favorites and they will appear here.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavorite={isFavorite(movie.imdbID)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites; 