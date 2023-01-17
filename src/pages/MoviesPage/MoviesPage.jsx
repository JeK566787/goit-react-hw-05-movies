import MoviesList from 'components/MoviesList/MoviesList';
import Form from 'components/Form/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useSearchParams } from 'react-router-dom';
import { getMoviesByQuery } from 'serevises/API';
import Loader from 'components/Loader/Loader';

import css from './MoviePage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(false);

  const searchQuery = searchParams.get('q');

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await getMoviesByQuery(searchQuery);
        setMovies(data.results);
      } catch (error) {
        toast.error('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchQuery]);

  const onSubmit = query => {
    setSearchParams({ q: query });
  };

  return (
    <section>
      <div className={css.wrapper}>
        <Form onSubmit={onSubmit} />
        {movies.length > 0 && <MoviesList movies={movies} />}
      </div>
      {isLoading && <Loader />}
    </section>
  );
};
export default MoviesPage;
