import { useParams, useNavigate  } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';
import {CreditsResponse,MovieDetail} from '../types/movie.ts';



export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate(); 

  const Moviesurl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const { data: moviedetail, isLoading: isLoading1, isError: isError1 } = useCustomFetch<MovieDetail>(Moviesurl);

  const Creditsurl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;
  const { data: creditData, isLoading: isLoading2, isError: isError2 } = useCustomFetch<CreditsResponse>(Creditsurl);

  console.log(creditData);

  if (isLoading1 || isLoading2) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className='sr-only'>로딩 중..</span>
      </div>
    );
  }

  if (isError1 || isError2) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">

        <div className="relative">

          <img
            src={`https://image.tmdb.org/t/p/w780/${moviedetail?.backdrop_path}`}
            alt={moviedetail?.title}
            className="w-full object-cover h-64"/>
          
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded hover:bg-black/80 text-sm">
            ← 뒤로가기 </button>
        </div>

        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-1">{moviedetail?.title}</h1>
          <p className="text-gray-400 italic mb-4">{moviedetail?.tagline}</p>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w300/${moviedetail?.poster_path}`}
              alt={moviedetail?.title}
              className="rounded-lg w-48"
            />

            <div className="flex-1 space-y-2">
            <p><strong className="text-blue-400">줄거리:</strong> {moviedetail?.overview}</p>
              <p><strong className="text-blue-400">장르:</strong> {moviedetail?.genres.map((g) => g.name).join(', ')}</p>
              <p><strong className="text-blue-400">상영 시간:</strong> {moviedetail?.runtime}분</p>
              <p><strong className="text-blue-400">개봉일:</strong> {moviedetail?.release_date}</p>
              <p><strong className="text-blue-400">평점:</strong> ⭐ {moviedetail?.vote_average}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 space-y-6 px-6">
          <h2 className="text-2xl font-bold mb-4">등장인물</h2>
          <div className="flex gap-4 overflow-x-scroll no-scrollbar p-2">
            {creditData?.cast.slice(0, 10).map((person)  => (
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
          <h2 className="text-2xl font-bold mb-4">크루</h2>
          <div className="flex gap-4 overflow-x-scroll no-scrollbar p-2">
            {creditData?.crew.slice(0, 10).map((person)  => (
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
                <p className="text-xs text-gray-400">{person.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}