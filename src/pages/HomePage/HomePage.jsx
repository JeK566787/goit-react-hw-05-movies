import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTrending } from '../../serevises/API';

import MoviesList from 'components/MoviesList/MoviesList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getTrending();
        setMovies(data.results);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <section>
      <div>
        <h1>HOME PAGE</h1>
        {movies.length > 0 && <MoviesList movies={movies} />}
      </div>

      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'blue',
          }}
        ></div>
      )}
    </section>
  );
};

export default HomePage;
