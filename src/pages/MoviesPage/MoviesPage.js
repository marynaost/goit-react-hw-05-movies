import { useState, useEffect } from 'react';
import { useLocation, useHistory, useRouteMatch, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../../services/api';
import noPoster from '../../images/noPoster.png';
import s from './MoviesPage.module.scss';

export default function MoviesPage() {
  const [name, setName] = useState('');
  const [movie, setMovie] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      API.fetchSearchMovies(query).then(res => setMovie(res.results));
    }
  }, [location.search]);

  const handleNameChange = e => {
    setName(e.target.value.toLowerCase());
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setName('');

    if (name.trim()) {
      const { results } = await API.fetchSearchMovies(name);
      setMovie(results);
      history.push({
        ...location,
        search: `query=${name}`,
      });

      if (results.length === 0) {
        return toast.error('Please, enter another name');
      }
    } else {
      return toast.warn('Enter the name');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          type="text"
          value={name}
          autoComplete="off"
          autoFocus
          placeholder="Enter the movie title"
          onChange={handleNameChange}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      {movie.length > 0 && (
        <ul className={s.list}>
          {movie.map(({ id, title, poster_path, name }) => (
            <li key={id} className={s.card}>
              <Link
                to={{
                  pathname: `${url}/${id}`,
                  state: { from: { location, label: 'Go back to search' } },
                }}
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : noPoster
                  }
                  alt={title}
                  className={s.image}
                />
                <p className={s.title}>{title || name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
