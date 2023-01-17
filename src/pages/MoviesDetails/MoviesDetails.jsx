import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';
import { getMoviesById } from 'serevises/API';
import Loader from 'components/Loader/Loader';
import css from './MoviesDetails.module.css';

const defaultImg =
  'http://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png';

const MoviesDetails = () => {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setLoading] = useState(true);

  const { moviesId } = useParams();

  const location = useLocation();

  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    if (!moviesId) return;

    const fetchMovies = async () => {
      try {
        const data = await getMoviesById(moviesId);

        setMovieData(data);
      } catch (error) {
        toast.error('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [moviesId]);

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
    <section className={css.wrapper}>
      {/* <h1>MOVIE DETAILS</h1> */}
      <Link className={css.buttonLink} to={backLink}>
        GO BACK
      </Link>
      <div className={css.detailsWrapper}>
        {/* <div>Movies Card Component</div> */}
        <div className={css.imgWrapper}>
          <img
            className={css.filmImg}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : defaultImg
            }
            alt={`poster of movie ${original_title}`}
          />
        </div>
        <div>
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
        </div>
      </div>
      <div className={css.linksWrapper}>
        <Link className={css.buttonLink} to={'cast'} state={{ from: backLink }}>
          Cast
        </Link>
        <Link
          className={css.buttonLink}
          to={'reviews'}
          state={{ from: backLink }}
        >
          Reviews
        </Link>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {isLoading && <Loader />}
    </section>
  );
};

export default MoviesDetails;
