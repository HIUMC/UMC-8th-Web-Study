import { useParams } from "react-router-dom";
import MovieList from "../components/MovieList";


const MoviePage: React.FC = () => {
  const { category } = useParams<{ category: string }>(); // URL에서 category 가져오기

  if (!category) return <p>잘못된 경로입니다.</p>;


  const categoryTitles: Record<string, string> = {
    now_playing: "현재 개봉작",
    popular: "인기 영화",
    top_rated: "평점 높은 영화",
    upcoming: "개봉 예정",
  };

  return <MovieList category={category} title={categoryTitles[category] || "영화 목록"} />;
};

export default MoviePage;