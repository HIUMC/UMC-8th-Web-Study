import { useEffect } from "react";

export default function MoviePage() {
  //   useEffect((): void => {
  //     const response = fetch(
  //       `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
  //     );
  //     console.log(response);
  //   }, []);

  // fetch 를 사용하면, 실질적인 data 값들은 const result = await response.json() 으로 풀어주는 과정이 필요함
  useEffect((): void => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
      );
      const result = await response.json();
      console.log(result);
    };

    fetchMovies();
  }, []);
  return <div>Movie Page</div>;
}
