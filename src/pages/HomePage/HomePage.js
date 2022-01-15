import { useState, useEffect } from 'react';
import * as API from '../../services/api';
import { useLocation, Link } from 'react-router-dom';
import s from './HomePage.module.scss';
import noPoster from '../../images/noPoster.png';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    API.fetchPopularMovies().then(response => setMovies(response.results));
  }, []);

  return (
    <>
      <h2>Tranding today</h2>
      {movies && (
        <ul className={s.list}>
          {movies.map(({ id, poster_path, title }) => (
            <li key={id} className={s.card}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: { location, label: 'Go back to popular films' },
                  },
                }}
              >
                <div>
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : noPoster
                    }
                    alt={title}
                    className={s.image}
                  />
                  <p className={s.title}>{title}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
