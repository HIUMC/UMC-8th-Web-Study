import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const params = useParams();
  console.log(params);
  return <h1>{params.movieId} 번 째 페이지 입니다 ~ Movies Page HOya ~!</h1>;
};

export default MoviesPage;
