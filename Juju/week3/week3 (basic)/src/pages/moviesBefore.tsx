// useParams: URL의 파라미터를 가져오기 위한 훅
import { useParams } from 'react-router-dom';

// movies.tsx
const MoviesPage = () => {
    const params = useParams();

    // 브라우저 콘솔로 보면 {movieId: '1'}과 같은 형태로 나옴
    //console.log(params);

    return (
        // 여기서 movieId는 App.tsx의 createBrowserRouter에서 설정한 path: 'movies/:movieId'의 movieId와 동일함
        // createBrowserRouter에서 해당 부분을 다르게 작성했으면 바뀐 이름으로 나옴
        <h1>{params.movieId}번의 Movies Page 야호~!</h1>
    );
};

export default MoviesPage;