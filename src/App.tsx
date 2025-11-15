// src/App.tsx
import { useState } from 'react';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';
import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';
import toast from 'react-hot-toast';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Функція обробки пошуку фільмів
  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const result = await fetchMovies(query);
      if (result.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(result);
    } catch (err) {
      setError('There was an error, please try again...');
      toast.error('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  // Функція для вибору фільму
  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  // Функція для закриття модального вікна
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      {/* Пошуковий бар */}
      <SearchBar onSubmit={handleSearch} />

      {/* Якщо є помилка, виводимо повідомлення про помилку */}
      {error && <ErrorMessage />}

      {/* Якщо в процесі завантаження, показуємо індикатор завантаження */}
      {loading && <Loader />}

      {/* Якщо фільми знайдені, виводимо їх у вигляді галереї */}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {/* Якщо вибрано фільм, відображаємо модальне вікно */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;




