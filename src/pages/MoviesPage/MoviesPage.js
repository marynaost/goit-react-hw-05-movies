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
  const [currentPage, setCurrentPage] = useState(1);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) {
      setMovie([]);
      return;
    }
    API.fetchSearchMovies(query, currentPage).then(({ results }) => {
      if (results.length === 0) {
        return toast.error('Please, enter another name');
      }
      setMovie(prevMovie => [...prevMovie, ...results]);
    });
  }, [currentPage, query]);

  const handleNameChange = e => {
    setName(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMovie([]);
    setName('');
    setCurrentPage(1);

    if (name.trim()) {
      history.push({
        ...location,
        search: `query=${name}`,
      });
    } else {
      return toast.warn('Enter the name');
    }
  };

  const handleButtonClick = () => {
    handleScroll();
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleScroll = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 500,
        behavior: 'smooth',
      });
    }, 500);
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
        <>
          <ul className={s.list}>
            {movie.map(({ id, title, poster_path, name }) => (
              <li key={id} className={s.card}>
                <Link
                  style={{ textDecoration: 'none', color: '#000' }}
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
          <button
            type="button"
            className={s.button}
            onClick={handleButtonClick}
          >
            Load more
          </button>
        </>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
