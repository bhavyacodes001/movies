import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbRating?: string;
}

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
        <div className="relative aspect-[2/3]">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">No Image Available</span>
            </div>
          ) : (
            <img
              src={movie.Poster === 'N/A' ? '/placeholder.jpg' : movie.Poster}
              alt={movie.Title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {movie.Title}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {movie.Year} • {movie.Type}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(movie.imdbID);
              }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <HeartIconSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIconOutline className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>

        <Link
          to={`/movie/${movie.imdbID}`}
          className="absolute inset-0 z-10"
          aria-label={`View details for ${movie.Title}`}
        />
      </div>
    </motion.div>
  );
};

export default React.memo(MovieCard); 