import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface MovieDetailsData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        
        if (response.data.Response === 'True') {
          setMovie(response.data);
          // Check if movie is in favorites
          const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
          setIsFavorite(favorites.includes(id));
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('An error occurred while fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, API_KEY]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((favId: string) => favId !== id)
      : [...favorites, id];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
              alt={movie.Title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {movie.Title}
              </h1>
              <button
                onClick={toggleFavorite}
                className="text-red-500 hover:text-red-600"
              >
                {isFavorite ? (
                  <HeartIconSolid className="h-6 w-6" />
                ) : (
                  <HeartIconOutline className="h-6 w-6" />
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                {movie.Year}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                {movie.Rated}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                {movie.Runtime}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                {movie.Genre}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{movie.Plot}</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">Director</h3>
                <p className="text-gray-600">{movie.Director}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Writer</h3>
                <p className="text-gray-600">{movie.Writer}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Actors</h3>
                <p className="text-gray-600">{movie.Actors}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Language</h3>
                <p className="text-gray-600">{movie.Language}</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Ratings</h3>
              <div className="flex flex-wrap gap-4">
                {movie.Ratings.map((rating) => (
                  <div key={rating.Source} className="text-center">
                    <p className="font-semibold">{rating.Source}</p>
                    <p className="text-gray-600">{rating.Value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Back to Search
      </button>
    </div>
  );
};

export default MovieDetailsPage; 