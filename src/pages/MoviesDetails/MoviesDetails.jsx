import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMoviesById } from 'serevises/API';

const MoviesDetails = () => {
  const [movieData, setMovieData] = useState({});
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

  const {
    poster_path,
    original_title,
    release_date,
    overview,
    genres,
    vote_average,
  } = movieData;
  console.log(movieData);

  return (
    <section>
      <div>
        <h1>MOVIE DETAILS</h1>
        <Link to={backLink}>GO BACK</Link>

        <div>Movies Card Component</div>
        <img
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={`poster of movie ${original_title}`}
        />
        <h2>
          {original_title} ({release_date && release_date.slice(0, 4)})
        </h2>
        <p>User score: {Math.ceil((vote_average * 100) / 10)} %</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h4>Genres</h4>
        <p>
          {genres &&
            genres.map(genre => {
              const { id, name } = genre;
              return <li key={id}>{name}</li>;
            })}
        </p>

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
