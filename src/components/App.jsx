import HomePage from 'pages/HomePage/HomePage';
import MoviesDetails from 'pages/MoviesDetails/MoviesDetails';
import MoviesPage from 'pages/MoviesPage/MoviesPage';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:moviesId" element={<MoviesDetails />}>
            <Route path="cast" element={<div>CAST</div>} />
            <Route path="reviews" element={<div>REVIEWS</div>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
