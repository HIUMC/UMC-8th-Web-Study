import { ReactElement } from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = (): ReactElement => {
  const params = useParams();
  console.log(params);

  return <div>MovieDetail Page</div>;
};
export default MovieDetailPage;
