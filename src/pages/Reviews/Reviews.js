import * as API from '../../services/api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews({ movie }) {
  const [reviews, setReviews] = useState(null);
  const { moviesId } = useParams();

  useEffect(() => {
    API.fetchMoviesReviews(moviesId).then(response => setReviews(response));
  }, [moviesId]);

  return (
    <div>
      {reviews && reviews.total_results === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}
      {reviews && (
        <ul>
          {reviews.results.map(review => (
            <li key={review.id}>
              <h3 style={{ marginTop: 10, marginBottom: 10 }}>
                Author: {review.author}
              </h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
