import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useHistory,
  useLocation,
  NavLink,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import * as API from '../../services/api';
// import Cast from 'components/Cast/Cast';
// import Reviews from 'components/Reviews/Reviews';
import noPoster from '../../images/noPoster.png';
import s from './MoviesPageDetail.module.scss';

const Cast = lazy(() =>
  import('components/Cast/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('components/Reviews/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MoviesPageDetail() {
  const history = useHistory();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    API.fetchMoviesDetail(moviesId).then(setMovie);
  }, [moviesId]);

  const onGoBack = () => {
    history.push(
      location?.state?.from?.location?.pathname
        ? `${location?.state?.from?.location?.pathname}${location.state?.from?.location?.search}`
        : '/',
    );
  };

  // console.log(location.state.from);

  return (
    <>
      <button type="button" onClick={onGoBack}>
        {location?.state?.from?.label ?? 'Go back'}
      </button>
      {movie && (
        <div>
          <div className={s.wrapper}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : noPoster
              }
              alt={movie.title}
            />
            <div className={s.infoWrapper}>
              <h3 className={s.title}>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h3>
              <p className={s.text}>Rating: {movie.vote_average}</p>
              <h4 className={s.title}>Overview</h4>
              <p className={s.text}>{movie.overview}</p>
              <h4 className={s.title}>Genres</h4>
              <ul className={s.genresList}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={s.genresItem}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={s.text}>Additional information</p>
          <ul>
            <li>
              <NavLink
                style={{ textDecoration: 'none' }}
                activeClassName={s.activeLink}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location?.state?.from },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ textDecoration: 'none' }}
                activeClassName={s.activeLink}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location?.state?.from },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      )}
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
        <Route path={`${path}/cast`}>
          {movie && <Cast moviesId={moviesId} />}
        </Route>
        <Route path={`${path}/reviews`}>
          {movie && <Reviews moviesId={moviesId} />}
        </Route>
      </Suspense>
    </>
  );
}
