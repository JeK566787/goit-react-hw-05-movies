import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCast } from 'serevises/API';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { moviesId } = useParams();

  console.log(cast);

  useEffect(() => {
    const fetchMovies = async () => {
      setError('');

      try {
        const data = await getCast(moviesId);
        setCast(data.cast);
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

  console.log(cast);
  return (
    <section>
      <ul>
        {cast.length > 0 &&
          cast.map(({ id, profile_path, original_name, character }) => {
            return (
              <li key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : 'no photo'
                  }
                  alt={original_name}
                />
                <p>{original_name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
      </ul>

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

export default Cast;
