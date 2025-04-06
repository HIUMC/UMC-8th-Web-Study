import { JSX } from 'react'
import { useParams } from 'react-router-dom';

const MovieDetailPage = (): JSX.Element => {
    const params = useParams();
    
    return (
    <div>
      MovieDetailPage{params.movieId}
    </div>
  )
};

export default MovieDetailPage
