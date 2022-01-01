import { useState, useEffect } from 'react';
import * as API from '../../services/api';
import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    API.fetchPopularMovies().then(response => setMovies(response.results));
  }, []);

  return (
    <>
      <h2>Tranding today</h2>
      {movies && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li key={movie.id} className={s.card}>
              <Link to={`/movies/${movie.id}`}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p className={s.title}>{movie.title}</p>
                  <p className={s.genre}>{movie.release_date.slice(0, 4)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
