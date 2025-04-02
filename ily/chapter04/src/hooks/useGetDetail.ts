import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type CASTMEMBER = {
  id: number;
  character: string;
  name: string;
  profile_path: string | null;
};

type CAST = {
  cast: CASTMEMBER[];
};

function useGetDetail() {
  const params = useParams();
  const { id } = params;
  const [credits, setCredits] = useState<CAST | null>(null);
  const [isBackdrop, setIsBackdrop] = useState<string | null>("");

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const responseCredits = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );

        const backdropImage = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );

        setCredits(responseCredits.data.cast);
        setIsBackdrop(backdropImage.data.backdrops[0].file_path);
      } catch {
        console.log("error");
      }
    };
    getMovieDetail();
  }, []);

  return { credits, isBackdrop };
}

export default useGetDetail;
