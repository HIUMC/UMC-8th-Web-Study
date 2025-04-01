import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Credit, MovieDetail } from "../types/movie";

type CASTMEMBER = {
  id: number;
  character: string;
  name: string;
  profile_path: string | null;
};

type CAST = {
  cast: CASTMEMBER[];
};
export default function MovieDetailPage() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<MovieDetail>({});
  const [credits, setCredits] = useState<CAST | null>(null);
  const getMovieDetail = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      },
    );

    setData(data);

    const responseCredits = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      },
    );

    setCredits(responseCredits.data.cast);
    console.log(responseCredits.data.cast);
    console.log(data);
  };

  useEffect(() => {
    getMovieDetail();
  }, [setData, setCredits]);

  return (
    <div>
      <div className="items-center flex flex-col justify-center w-full h-full p-10 ">
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w200${data.poster_path}`
              : ""
          }
          alt={data.title ? `${data.title} 영화의 이미지` : "영화 이미지 없음"}
        />
        <div className="flex flex-col justify-center items-center">
          <h1>{data.title}</h1>
          <h2>{data.vote_average}</h2>
          <h3>{data.overview}</h3>
        </div>
      </div>
      <div
        className="size-100 w-full p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-10 text-xs"
      >
        {credits?.map((cast) => (
          <div key={cast.id}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
              />
              <h4>
                {" "}
                {cast.known_for_department}/ {cast.name}
              </h4>
              <p>{cast.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
