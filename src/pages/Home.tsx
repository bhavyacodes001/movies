import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { StarIcon, FilmIcon, TvIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbRating?: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [trendingSeries, setTrendingSeries] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('movie');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
  const ITEMS_PER_PAGE = 10;

  // Fetch recommended movies
  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers&type=movie`
        );
        if (response.data.Response === 'True') {
          setRecommendedMovies(response.data.Search.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching recommended movies:', err);
      }
    };

    fetchRecommendedMovies();
  }, [API_KEY]);

  // Fetch trending series
  useEffect(() => {
    const fetchTrendingSeries = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=game&type=series`
        );
        if (response.data.Response === 'True') {
          setTrendingSeries(response.data.Search.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching trending series:', err);
      }
    };

    fetchTrendingSeries();
  }, [API_KEY]);

  // Fetch top rated movies
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=inception&type=movie`
        );
        if (response.data.Response === 'True') {
          setTopRatedMovies(response.data.Search.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching top rated movies:', err);
      }
    };

    fetchTopRatedMovies();
  }, [API_KEY]);

  // Fetch new releases
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=2023&type=movie`
        );
        if (response.data.Response === 'True') {
          setNewReleases(response.data.Search.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching new releases:', err);
      }
    };

    fetchNewReleases();
  }, [API_KEY]);

  const searchMovies = async (page: number = 1) => {
    if (!searchTerm) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&type=${type}&page=${page}`
      );
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setTotalPages(Math.ceil(parseInt(response.data.totalResults) / ITEMS_PER_PAGE));
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('An error occurred while fetching movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchMovies(currentPage);
    }
  }, [searchTerm, type, currentPage, searchMovies]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const SectionHeader: React.FC<{ title: string; icon: React.ReactNode; gradient?: string }> = ({ title, icon, gradient }) => (
  <div className="flex items-center space-x-3 mb-6">
    <div className={`p-3 rounded-lg shadow-lg ${gradient || 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'}`}> 
      {icon}
    </div>
    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
      {title}
    </h2>
  </div>
);

  // Add favorite logic
  const getFavorites = () => JSON.parse(localStorage.getItem('favorites') || '[]');
  const isFavorite = (id: string) => getFavorites().includes(id);
  const handleToggleFavorite = (id: string) => {
    const favorites = getFavorites();
    let newFavorites;
    if (favorites.includes(id)) {
      newFavorites = favorites.filter((favId: string) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    // Force re-render
    setMovies((prev) => [...prev]);
    setRecommendedMovies((prev) => [...prev]);
    setTrendingSeries((prev) => [...prev]);
    setTopRatedMovies((prev) => [...prev]);
    setNewReleases((prev) => [...prev]);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
          alt="Movie Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to CineVerse
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Your ultimate destination for discovering and exploring movies and TV shows from around the world.
          </p>
          <div className="max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <SectionHeader title="Search Results" icon={<FilmIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} />
            <TypeFilter selectedType={type} onTypeChange={handleTypeChange} />
          </div>

          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    isFavorite={isFavorite(movie.imdbID)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>

              {movies.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}

          {!loading && movies.length === 0 && searchTerm && !error && (
            <div className="flex flex-col items-center justify-center py-16">
              <img src="/no-results.svg" alt="No results" className="w-40 h-40 mb-6 opacity-80" />
              <div className="text-xl font-semibold text-gray-500 mb-2">No results found</div>
              <div className="text-gray-400">Try a different search term or filter.</div>
            </div>
          )}
        </div>
      )}

      {/* Recommended Movies */}
      {!searchTerm && (
        <div className="space-y-6">
          <SectionHeader title="Recommended Movies" icon={<StarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {recommendedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Top Rated Movies */}
      {!searchTerm && (
        <div className="space-y-6">
          <SectionHeader title="Top Rated Movies" icon={<StarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {topRatedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* New Releases */}
      {!searchTerm && (
        <div className="space-y-6">
          <SectionHeader title="New Releases" icon={<CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {newReleases.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                isFavorite={isFavorite(movie.imdbID)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trending Series */}
      {!searchTerm && (
        <div className="space-y-6">
          <SectionHeader title="Trending Series" icon={<TvIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {trendingSeries.map((series) => (
              <MovieCard
                key={series.imdbID}
                movie={series}
                isFavorite={isFavorite(series.imdbID)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 