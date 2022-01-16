import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './App.css';
import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';

const HomePage = lazy(() =>
  import('./pages/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MoviesPageDetail = lazy(() =>
  import(
    './pages/MoviesPageDetail/MoviesPageDetail' /* webpackChunkName: "movies-page-detail" */
  ),
);

const NotFound = lazy(() =>
  import('./pages/NotFound/NotFound' /* webpackChunkName: "notfound-page" */),
);

export default function App() {
  return (
    <>
      <AppBar />
      <Container>
        <Suspense
          fallback={
            <Loader
              style={{ textAlign: 'center' }}
              type="ThreeDots"
              color="#3f51b5"
              height={80}
              width={80}
              timeout={3000}
            />
          }
        >
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:moviesId" component={MoviesPageDetail} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
