import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getReviews } from 'serevises/API';
import css from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { moviesId } = useParams();

  console.log(reviews);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getReviews(moviesId);
        console.log(data);
        setReviews(data.results);
      } catch (error) {
        toast.error('something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [moviesId]);
  return (
    <section>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(el => {
            const { id, author, content } = el;
            return (
              <li key={id} className={css.reviewsItem}>
                <h2>{author}</h2>
                <p>{content}</p>
              </li>
            );
          })
        ) : (
          <li>
            <h3>THERE IS NO REVIEWS</h3>
          </li>
        )}
      </ul>
      {isLoading && <Loader />}
    </section>
  );
};

export default Reviews;
