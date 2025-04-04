# TMDB 영화 웹사이트 - 미션 3

## 기능

- 영화 상세 페이지 구현
- 라우팅을 통한 페이지 이동 구현
- 영화 리뷰 기능 추가

## ⚡ 트러블 슈팅

<details>
<summary>⚡이슈 No.1</summary>
  
- 문제 상황: React Router v6에서 동적 라우팅 구현 시 파라미터 접근 오류
- 원인: v6 버전에서는 useParams 훅의 사용 방법이 이전 버전과 달라짐
- 해결 방법: useParams 훅을 사용하고 타입 단언을 통해 파라미터에 안전하게 접근하도록 수정
</details>

<details>
<summary>⚡이슈 No.2</summary>
  
- 문제 상황: 영화 상세 정보를 가져올 때 API 호출 중복 발생
- 원인: 컴포넌트가 리렌더링될 때마다 useEffect가 실행되어 API를 중복 호출
- 해결 방법: 의존성 배열에 필요한 값만 포함시키고, API 응답 데이터를 캐싱하여 중복 호출 방지
</details>

<details>
<summary>⚡이슈 No.3</summary>
  
- 문제 상황: 리뷰 작성 후 상태 업데이트가 즉시 반영되지 않음
- 원인: 비동기 상태 업데이트와 관련된 React의 배치 처리 메커니즘
- 해결 방법: 함수형 업데이트 패턴을 사용하여 상태 업데이트를 보장하고, 필요한 경우 useEffect 의존성 배열을 조정
</details>

## 📢 학습 회고

<details>
<summary>📢 학습 회고 내용</summary>
  
이해한 점:
- React Router를 활용한 SPA에서의 페이지 라우팅 구현 방법
- URL 파라미터를 통한 동적 라우팅 및 데이터 로딩 패턴
- 컴포넌트 간 상태 공유 및 Prop drilling의 한계점
- 비동기 데이터 흐름 관리와 에러 처리 방법

어려운 점 (개선 방법):
- 다양한 경로와 중첩 라우팅 설계의 복잡성 → 라우팅 구조를 계층적으로 설계하여 관리성 향상
- 페이지 간 상태 유지 및 공유의 어려움 → Context API 또는 상태 관리 라이브러리 도입 검토
- 라우팅 변경 시 데이터 재로딩 문제 → React Query 같은 데이터 페칭 라이브러리 활용 고려

회고:
- 단일 페이지 애플리케이션(SPA)의 장점과 구현 방법에 대한 이해도가 깊어짐
- 라우팅 구조가 사용자 경험과 애플리케이션 구조에 미치는 영향을 인식함
- 상태 관리와 데이터 흐름의 중요성을 체감하고, 더 효율적인 패턴에 대한 학습 필요성을 느낌
- 컴포넌트 재사용성과 관심사 분리 원칙의 중요성을 배움
</details>

# 미션 3: 영화 상세 페이지 구현

## 프로젝트 구조

```
src/
├── App.tsx                // 메인 애플리케이션 컴포넌트
├── assets/                // 정적 자원 (이미지 등)
├── components/            // 재사용 가능한 컴포넌트
│   ├── ErrorMessage.tsx   // 에러 표시 컴포넌트
│   ├── Layout.tsx         // 레이아웃 컴포넌트
│   ├── LoadingSpinner.tsx // 로딩 스피너 컴포넌트
│   ├── MovieCard.tsx      // 영화 카드 컴포넌트
│   ├── Navbar.tsx         // 네비게이션 바 컴포넌트
│   └── Pagination.tsx     // 페이지네이션 컴포넌트
├── pages/                 // 페이지 컴포넌트
│   ├── HomePage.tsx       // 홈 페이지
│   ├── MovieDetailPage.tsx// 영화 상세 페이지
│   ├── MovieListPage.tsx  // 영화 목록 페이지
│   └── NotFoundPage.tsx   // 404 페이지
├── router.tsx             // 라우터 설정
├── types/                 // 타입 정의
│   └── movie.ts           // 영화 관련 타입 정의
└── main.tsx               // 앱 진입점
```

## 기술 스택 및 라이브러리

- React
- TypeScript
- React Router: 클라이언트 사이드 라우팅
- Fetch API: API 호출
- Tailwind CSS: 스타일링
- Vite: 빌드 도구

## 코드 구조 분석

### 타입 정의 (`types/movie.ts`)

미션 2에서 확장된 타입 정의로, 영화 상세 정보 및 출연/제작진 정보 포함

```typescript
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
```

### 라우터 설정 (`router.tsx`)

React Router를 사용한 애플리케이션 라우트 구성

```typescript
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movies/:category',
        element: <MovieListPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
```

### 영화 상세 페이지 (`pages/MovieDetailPage.tsx`)

영화의 상세 정보 및 출연/제작진을 보여주는 페이지 컴포넌트

```typescript
interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
}

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMovieDetail = async () => {
      // 영화 상세 정보 및 출연/제작진 정보 가져오는 로직
    };

    if (id) {
      fetchMovieDetail();
    }
  }, [id]);

  // 유틸리티 함수들
  const formatCurrency = (value: number) => { /* ... */ };
  const getDirectors = () => { /* ... */ };
  const getMainCast = () => { /* ... */ };

  // 조건부 렌더링 및 UI 반환
  // ...
};
```

## 코드 작동 로직

### 1. 라우팅 구현

1. **중첩 라우트 구조**
   - `Layout` 컴포넌트를 부모 레이아웃으로 설정
   - `Outlet`을 사용하여 중첩된 자식 라우트 내용 표시
   - 모든 페이지에 공통으로 `Navbar` 적용

2. **동적 라우트 파라미터**
   - `/movies/:category`: 카테고리별 영화 목록 페이지
   - `/movie/:id`: 영화 ID를 기반으로 한 상세 페이지
   - `useParams` 훅으로 URL 파라미터 추출

3. **404 페이지 처리**
   - 정의되지 않은 경로에 대해 `NotFoundPage` 컴포넌트 표시

### 2. 영화 상세 정보 조회

1. **데이터 페칭 과정**
   - URL에서 영화 ID 추출
   - `fetchMovieDetail` 함수에서 병렬로 두 개의 API 요청 수행:
     - 영화 상세 정보: `/movie/{id}`
     - 영화 출연/제작진: `/movie/{id}/credits`
   - 각 응답을 JSON으로 변환하여 상태에 저장
   - 오류 처리
   - 로딩 상태 종료

2. **에러 처리 및 로딩 상태**
   - API 요청 실패 시 에러 메시지 표시
   - 로딩 중에는 `LoadingSpinner` 컴포넌트 표시
   - 영화 정보가 없는 경우 적절한 메시지 표시

### 3. 상세 페이지 UI 구현

1. **섹션 구성**
   - 배경: 영화 백드롭 이미지를 흐리게 처리하여 배경으로 사용
   - 상단 정보 섹션: 포스터, 제목, 장르, 개봉일, 상영 시간 등 기본 정보
   - 줄거리 섹션: 영화 개요 텍스트
   - 감독 섹션: 영화 감독 정보 및 사진
   - 출연진 섹션: 주요 출연진 정보 및 사진 (최대 10명)

2. **시각적 효과**
   - 반응형 레이아웃 (모바일부터 데스크톱까지)
   - 글래스모피즘 효과 (backdrop-blur 사용)
   - 호버 효과 및 애니메이션
   - 계층적 시각 구조로 정보 가독성 확보

## 주요 함수 설명

### `MovieDetailPage.tsx`

1. **fetchMovieDetail**
   - 목적: 영화 상세 정보 및 출연/제작진 정보 가져오기
   - 동작 과정:
     - 로딩 상태 설정
     - Fetch API를 사용하여 영화 상세 정보 요청
     - Fetch API를 사용하여 영화 출연/제작진 정보 요청
     - 각 응답을 JSON으로 변환하여 상태에 저장
     - 오류 처리
     - 로딩 상태 종료

2. **formatCurrency**
   - 목적: 숫자를 통화 형식으로 포맷팅
   - 매개변수: `value` (형식화할 숫자)
   - 반환값: 통화 형식의 문자열 (예: '$10,000,000')
   - 동작: `Intl.NumberFormat`을 사용하여 USD 형식으로 변환

3. **getDirectors**
   - 목적: 영화의 감독 정보 추출
   - 반환값: 감독 정보를 담은 배열 (`Crew[]`)
   - 동작: `credits.crew` 배열에서 `job`이 'Director'인 항목만 필터링

4. **getMainCast**
   - 목적: 주요 출연진 정보 추출
   - 반환값: 상위 10명의 출연자 정보를 담은 배열 (`Cast[]`)
   - 동작: `credits.cast` 배열에서 처음 10개 항목 추출

### `MovieListPage.tsx` (미션 2에서 확장)

1. **fetchMovies**
   - 미션 2의 기능을 유지하되, 선택한 영화의 상세 페이지로 이동하는 기능 추가
   - 영화 카드 클릭 시 `/movie/:id` 경로로 이동하도록 구현

### 개선된 컴포넌트

1. **MovieCard**
   - 미션 1, 2의 기능을 유지하되, 클릭 이벤트 핸들러 추가
   - 카드 클릭 시 해당 영화 상세 페이지로 이동하는 기능 구현
   - 카드 디자인 개선 및 애니메이션 효과 강화

2. **Layout**
   - 앱의 전체 레이아웃을 담당하는 컴포넌트
   - `Navbar`와 `Outlet`을 결합하여 일관된 UI 제공
   - 반응형 디자인 적용으로 다양한 화면 크기 지원

## 기술적 도전 과제

1. **복잡한 UI 구현**
   - 글래스모피즘 스타일의 현대적 UI 디자인
   - 백드롭 이미지를 활용한 시각적 계층 구현
   - 그리드 및 플렉스 레이아웃을 사용한 반응형 디자인

2. **다중 API 요청 처리**
   - 영화 상세 정보와 출연/제작진 정보의 병렬 요청
   - API 응답 상태에 따른 UI 조건부 렌더링
   - 다양한 형태의 데이터 처리 및 가공

3. **타입 안전성 확보**
   - 복잡한 API 응답 구조에 대한 타입 정의
   - 조건부 렌더링과 옵셔널 체이닝을 활용한 안전한 데이터 접근
   - TypeScript의 타입 시스템을 활용한 개발 경험 개선

