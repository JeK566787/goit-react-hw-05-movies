import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMoviesById } from 'serevises/API';

const MoviesDetails = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { moviesId } = useParams();
  const location = useLocation();

  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    if (!moviesId) return;

    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getMoviesById(moviesId);

        setMovieData(data);
      } catch (error) {
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [moviesId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <section>
      <div>
        <h1>MOVIE DETAILS</h1>
        <Link to={backLink}>GO BACK</Link>

        <div>Movies Card Component</div>
        <Link to={'cast'} state={{ from: backLink }}>
          Cast
        </Link>
        <Link to={'reviews'} state={{ from: backLink }}>
          Reviews
        </Link>
        <Outlet />
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

export default MoviesDetails;
