import * as API from '../../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './Cast.module.scss';
import noPoster from '../../images/noPoster.png';

export default function Cast({ movie }) {
  const [cast, setCast] = useState(null);
  const { moviesId } = useParams();

  useEffect(() => {
    API.fetchMoviesCredits(moviesId).then(response => setCast(response.cast));
  }, [moviesId]);

  return (
    <>
      {/* <h2>{movie.title} </h2> */}

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
