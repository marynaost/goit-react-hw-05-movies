import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';
// import HomePage from 'pages/HomePage/HomePage';
// import MoviesPage from 'pages/MoviesPage/MoviesPage';
// import MoviesPageDetail from 'pages/MoviesPageDetail/MoviesPageDetail';

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

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<h1> Loading</h1>}>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies" exact component={MoviesPage} />
          <Route path="/movies/:moviesId" component={MoviesPageDetail} />
        </Switch>
      </Suspense>
    </Container>
  );
}
