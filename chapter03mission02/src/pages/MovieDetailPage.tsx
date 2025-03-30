import { useParams } from "react-router-dom";

export default function MovieDetailPage() {
  const params = useParams();
  console.log(params);

  return <>MovieDetail</>;
}
