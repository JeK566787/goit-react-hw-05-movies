import { Link, useLocation } from 'react-router-dom';
import css from './NotFound.module.css';

const NotFound = () => {
  const location = useLocation();

  const backLink = location?.state?.from ?? '/';

  return (
    <div className={css.wrapper}>
      <Link className={css.button} to={backLink}>
        GO BACK
      </Link>
      <h1 className={css.title}>PAGE DID NOT FIND</h1>
    </div>
  );
};

export default NotFound;
