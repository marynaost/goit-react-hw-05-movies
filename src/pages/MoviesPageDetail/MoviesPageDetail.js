import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, Route, useRouteMatch } from 'react-router-dom';
import * as API from '../../services/api';
import Cast from 'components/Cast/Cast';
import s from './MoviesPageDetail.module.scss';

export default function MoviesPageDetail() {
  const { url, path } = useRouteMatch();
  const { moviesId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    API.fetchMoviesDetail(moviesId).then(setMovie);
  }, [moviesId]);

  return (
    <>
      <h2>MoviesPageDetail</h2>

      {movie && (
        <div>
          <div className={s.wrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
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
      <hr />

      <Route path={`${path}/cast`}>{movie && <Cast movie={movie} />}</Route>
    </>
  );
}
