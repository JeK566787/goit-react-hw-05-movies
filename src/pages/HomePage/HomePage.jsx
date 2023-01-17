import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getTrending } from '../../serevises/API';

import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrending();
        setMovies(data.results);
      } catch (error) {
        // setError('something went wrong');
        toast.error('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section>
      <div className={css.wrapper}>
        <h1>Trending today</h1>
        {movies.length > 0 && <MoviesList movies={movies} />}
      </div>

      {isLoading && <Loader />}
    </section>
  );
};

export default HomePage;
