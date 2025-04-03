import { useParams, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface Cast {
  id: number;
  name: string;
  original_name: string; 
  profile_path: string;
  character: string;
}

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  runtime: number;
  tagline: string;
}

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setCast(data.cast.slice(0, 10)); // 상위 10명만 예시
    };
  
    fetchCredits();
  }, [movieId]);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );
      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  console.log(cast)
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">

        <div className="relative">

          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full object-cover h-64"/>
          
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded hover:bg-black/80 text-sm">
            ← 뒤로가기 </button>
        </div>

        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
          <p className="text-gray-400 italic mb-4">{movie.tagline}</p>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-48"
            />

            <div className="flex-1 space-y-2">
              <p><strong className="text-blue-400">줄거리:</strong> {movie.overview}</p>
              <p><strong className="text-blue-400">장르:</strong> {movie.genres.map((g) => g.name).join(', ')}</p>
              <p><strong className="text-blue-400">상영 시간:</strong> {movie.runtime}분</p>
              <p><strong className="text-blue-400">개봉일:</strong> {movie.release_date}</p>
              <p><strong className="text-blue-400">평점:</strong> ⭐ {movie.vote_average}</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">등장인물</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2">
            {cast.map((person) => (
              <div key={person.id} className="flex-shrink-0 w-32 text-center">
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                      : 'https://via.placeholder.com/185x278?text=No+Image'
                  }
                  alt={person.name}
                  className="w-full h-40 object-cover rounded-lg shadow-md mb-1"
                />
                <p className="text-sm font-semibold text-white">{person.name}</p>
                <p className="text-xs text-gray-400">{person.original_name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}