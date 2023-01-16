import MoviesList from 'components/MoviesList/MoviesList';
import Form from 'components/Form/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from 'serevises/API';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchQuery = searchParams.get('q');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setError('');
      setLoading(true);

      try {
        const data = await getMoviesByQuery(searchQuery);
        setMovies(data.results);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <section>
      <div>
        <h1>SEARCH MOVIES PAGE</h1>
        <Form />
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
export default MoviesPage;
