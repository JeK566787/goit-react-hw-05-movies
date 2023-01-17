// import HomePage from 'pages/HomePage/HomePage';
// import MoviesDetails from 'pages/MoviesDetails/MoviesDetails';
// import MoviesPage from 'pages/MoviesPage/MoviesPage';

import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Cast from './Cast/Cast';
import { Layout } from './Layout/Layout';
// import NotFound from './NotFound/NotFound';
// import Reviews from './Reviews/Reviews';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const MoviesDetails = lazy(() => import('pages/MoviesDetails/MoviesDetails'));
const MoviesPage = lazy(() => import('pages/MoviesPage/MoviesPage'));
const Cast = lazy(() => import('./Cast/Cast'));
const NotFound = lazy(() => import('./NotFound/NotFound'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:moviesId" element={<MoviesDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
