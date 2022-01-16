import * as API from '../../services/api';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Cast.module.scss';
import noPoster from '../../images/noPoster.png';

export default function Cast({ moviesId }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    API.fetchMoviesCredits(moviesId).then(response => setCast(response.cast));
  }, [moviesId]);

  return (
    <>
      {cast && (
        <ul className={s.list}>
          {cast.map(elem => (
            <li key={elem.id} className={s.item}>
              <img
                className={s.image}
                src={
                  elem.profile_path
                    ? `https://image.tmdb.org/t/p/w300${elem.profile_path}`
                    : noPoster
                }
                alt={elem.name}
              />
              <div className={s.wrapper}>
                <h4 className={s.name}>{elem.name}</h4>
                <p>Character: {elem.character} </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string,
};
