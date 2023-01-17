import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <header className={css.header}>
        <div>
          <nav>
            <ul className={css.headerList}>
              <li className={css.headerItem}>
                <NavLink to="/">Home</NavLink>
              </li>
              <li className={css.headerItem}>
                <NavLink to="/movies">Movies</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
    </>
  );
};
