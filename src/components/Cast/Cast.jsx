import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCast } from 'serevises/API';
import css from './Cast.module.css';

const defaultImg =
  'http://argauto.lv/application/modules/themes/views/default/assets/images/image-placeholder.png';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { moviesId } = useParams();

  console.log(cast);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getCast(moviesId);
        setCast(data.cast);
      } catch (error) {
        // setError('something went wrong');
        toast.error('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [moviesId]);

  return (
    <section>
      <ul className={css.castList}>
        {cast.length > 0 ? (
          cast.map(({ id, profile_path, original_name, character }) => {
            return (
              <li key={id} className={css.castItem}>
                <div className={css.castImgContainer}>
                  <img
                    className={css.castImg}
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : defaultImg
                    }
                    alt={original_name}
                  />
                </div>

                <p>{original_name}</p>
                <p>
                  <b>Character:</b> {character}
                </p>
              </li>
            );
          })
        ) : (
          <li>
            <h3>THERE IS NO INFORMATION</h3>
          </li>
        )}
      </ul>

      {isLoading && <Loader />}
    </section>
  );
};

export default Cast;
