import { useState, useEffect } from 'react';
import {
  useParams,
  useHistory,
  useLocation,
  NavLink,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import * as API from '../../services/api';
import Cast from 'pages/Cast/Cast';
import Reviews from 'pages/Reviews/Reviews';
import noPoster from '../../images/noPoster.png';
import s from './MoviesPageDetail.module.scss';

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
      location?.state?.from?.pathname
        ? `${location?.state?.from?.pathname}${location.state?.from?.search}`
        : '/',
    );
  };

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
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
        </div>
      )}

      <Route path={`${path}/cast`}>{movie && <Cast movie={movie} />}</Route>
      <Route path={`${path}/reviews`}>
        {movie && <Reviews movie={movie} />}
      </Route>
    </>
  );
}
