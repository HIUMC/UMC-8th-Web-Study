# 영화 검색 웹사이트

- TMDB API를 통한 인기 영화 데이터 가져오기
- 영화 정보를 카드 형태로 표시
- 호버 효과를 통한 영화 상세 정보 표시

1. TMDB 웹사이트에 가입하고 API 키를 발급
2. 프로젝트 루트 폴더에 `.env` 파일을 생성하고 다음과 같이 작성

```
VITE_TMDB_KEY=여기에_TMDB_API_토큰_입력
```

## 구현 내용
- useEffect를 활용한 API 데이터 로딩
- TypeScript 인터페이스를 사용한 타입 안전성 확보
- Tailwind CSS를 활용한 반응형 UI 구현
- 호버 효과를 구현하여 사용자 경험 향상

## ⚡ 트러블 슈팅

<details>
<summary>⚡이슈 No.1</summary>
  
- 문제 상황: 영화 검색 기능 구현 시 검색어 입력마다 API 호출이 발생하는 문제
- 원인: 사용자 입력 이벤트가 발생할 때마다 즉시 API를 호출하는 방식으로 구현됨
- 해결 방법: debounce 기법을 적용하여 사용자가 타이핑을 멈춘 후 일정 시간(500ms)이 지난 후에만 API를 호출하도록 수정
</details>

<details>
<summary>⚡이슈 No.2</summary>
  
- 문제 상황: 검색 결과가 없을 때 UI 처리가 미흡함
- 원인: 검색 결과가 빈 배열일 경우에 대한 조건부 렌더링이 구현되지 않음
- 해결 방법: 검색 결과가 없을 경우 사용자에게 안내 메시지를 표시하는 컴포넌트를 추가하여 UX 개선
</details>

<details>
<summary>⚡이슈 No.3</summary>
  
- 문제 상황: 페이지 새로고침 시 검색 상태가 초기화되는 문제
- 원인: 검색어와 결과가 상태로만 관리되어 영구 저장소에 저장되지 않음
- 해결 방법: localStorage를 활용하여 최근 검색어와 결과를 저장하고, 페이지 로드 시 복원하는 로직 구현
</details>

## 📢 학습 회고

<details>
<summary>📢 학습 회고 내용</summary>
  
이해한 점:
- 사용자 입력 처리와 API 호출 최적화(debounce) 방법
- React에서 검색 기능을 구현하는 다양한 패턴과 방식
- localStorage를 활용한 상태 유지 및 관리 방법
- 조건부 렌더링을 통한 다양한 상태(로딩, 에러, 결과 없음)의 UI 처리

어려운 점 (개선 방법):
- debounce와 같은 최적화 기법 구현 → 외부 라이브러리(lodash) 활용 검토
- 검색 상태와 결과 관리의 복잡성 → 상태 관리 패턴 또는 라이브러리 도입 고려
- 다양한 검색 조건(장르, 연도 등)을 추가할 때의 복잡성 → 컴포넌트 분리와 재사용성 향상

회고:
- 사용자 경험을 고려한 검색 기능 구현의 중요성을 인식함
- API 호출 최적화가 성능과 사용자 경험에 큰 영향을 미친다는 점을 배움
- 상태 관리의 중요성과 복잡성을 체감하고, 상태 관리 패턴에 대한 학습 필요성을 느낌
</details>

# 미션 2: 라우팅 및 페이지네이션 구현

## 프로젝트 구조

```
src/
├── App.tsx                // 메인 애플리케이션 컴포넌트
├── assets/                // 정적 자원 (이미지 등)
├── components/            // 재사용 가능한 컴포넌트
│   ├── ErrorDisplay.tsx   // 에러 표시 컴포넌트
│   ├── Layout.tsx         // 레이아웃 컴포넌트
│   ├── LoadingSpinner.tsx // 로딩 스피너 컴포넌트
│   ├── MovieCard.tsx      // 영화 카드 컴포넌트
│   ├── Navbar.tsx         // 네비게이션 바 컴포넌트
│   └── Pagination.tsx     // 페이지네이션 컴포넌트
├── pages/                 // 페이지 컴포넌트
│   ├── HomePage.tsx       // 홈 페이지
│   └── MovieListPage.tsx  // 영화 목록 페이지
├── services/              // 서비스 로직
│   └── movieService.ts    // 영화 관련 API 서비스
└── types/                 // 타입 정의
    └── movie.ts           // 영화 관련 타입 정의
```

## 기술 스택 및 라이브러리

- React
- TypeScript
- React Router: 클라이언트 사이드 라우팅
- Axios: API 호출
- Tailwind CSS: 스타일링
- Vite: 빌드 도구

## 코드 구조 분석

### 영화 서비스 (`services/movieService.ts`)

영화 데이터를 가져오는 API 관련 함수들을 모듈화

```typescript
// API 설정
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 영화 데이터 fetch 함수
export const fetchMovies = async (category: string, page: number = 1, language: string = 'ko-KR'): Promise<MovieApiResponse> => {
  // ... API 호출 로직
};

// 카테고리 경로 변환 함수
export const getCategoryPath = (category: string): string => {
  // ... 카테고리 매핑 로직
};

// 카테고리 제목 변환 함수
export const getCategoryTitle = (category: string): string => {
  // ... 카테고리 제목 매핑 로직
};
```

### 영화 목록 페이지 (`pages/MovieListPage.tsx`)

선택된 카테고리에 따라 영화 목록을 표시하는 페이지 컴포넌트

```typescript
const MovieListPage = () => {
  const { category = 'popular' } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    // 영화 데이터 가져오는 로직
  }, [category, currentPage]);

  const handlePageChange = (page: number) => {
    // 페이지 변경 처리 로직
  };

  return (
    // UI 렌더링 로직
  );
};
```

### 페이지네이션 컴포넌트 (`components/Pagination.tsx`)

페이지 번호를 표시하고 페이지 이동 기능 제공

```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 페이지네이션 로직 및 UI 렌더링
};
```

### 네비게이션 바 (`components/Navbar.tsx`)

카테고리 간 이동을 위한 네비게이션 링크 제공

```typescript
const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      {/* 네비게이션 UI */}
    </nav>
  );
};
```

## 코드 작동 로직

### 라우팅 구현

1. **라우트 설정**
   - React Router의 `BrowserRouter`, `Routes`, `Route` 컴포넌트 사용
   - 주요 라우트:
     - `/`: 홈 페이지 (인기 영화 표시)
     - `/movies/:category`: 카테고리별 영화 목록 페이지

2. **URL 파라미터 활용**
   - `useParams` 훅을 사용하여 URL에서 카테고리 파라미터 추출
   - `category` 값에 따라 다른 API 엔드포인트 호출

### 영화 데이터 가져오기

1. **영화 서비스 모듈화**
   - `movieService.ts` 파일에 API 관련 로직 분리
   - axios 인스턴스 생성 및 공통 헤더 설정
   - 카테고리별 API 경로 매핑 함수 구현

2. **데이터 페칭 과정**
   - 컴포넌트 마운트 또는 `category`/`currentPage` 변경 시 `useEffect` 실행
   - `fetchMovies` 함수 호출하여 해당 카테고리의 영화 목록 로드
   - 로딩 상태 및 에러 상태 관리
   - 성공 시 영화 목록과 총 페이지 수 상태 업데이트

### 페이지네이션 구현

1. **페이지 상태 관리**
   - `currentPage` 상태로 현재 페이지 번호 관리
   - `totalPages` 상태로 총 페이지 수 저장 (API 응답에서 추출)

2. **페이지 변경 핸들링**
   - `handlePageChange` 함수로 페이지 변경 시 로직 처리
   - 페이지 변경 시 스크롤을 페이지 상단으로 이동
   - 새 페이지 번호로 상태 업데이트 → `useEffect` 트리거 → 데이터 다시 로드

3. **페이지네이션 UI**
   - 현재 페이지 주변의 페이지 번호만 표시 (5개 정도)
   - 첫 페이지/마지막 페이지 버튼 제공
   - 이전/다음 페이지 버튼 제공
   - 활성 페이지 시각적으로 구분

## 주요 함수 설명

### `movieService.ts`

1. **fetchMovies**
   - 목적: TMDB API에서 카테고리별 영화 목록 가져오기
   - 매개변수:
     - `category`: 영화 카테고리 (popular, top_rated 등)
     - `page`: 페이지 번호 (기본값: 1)
     - `language`: 언어 설정 (기본값: 'ko-KR')
   - 반환값: `Promise<MovieApiResponse>` (영화 목록 데이터)

2. **getCategoryPath**
   - 목적: URL 파라미터로 받은 카테고리 이름을 API 경로로 변환
   - 매개변수: `category` (URL에서 추출한 카테고리명)
   - 반환값: API에서 사용할 카테고리 경로
   - 변환 예:
     - 'popular' → 'popular'
     - 'top-rated' → 'top_rated'

3. **getCategoryTitle**
   - 목적: 카테고리 경로를 사용자에게 표시할 한글 제목으로 변환
   - 매개변수: `category` (URL에서 추출한 카테고리명)
   - 반환값: 화면에 표시할 한글 카테고리 제목
   - 변환 예:
     - 'popular' → '인기 영화'
     - 'top-rated' → '평점 높은 영화'

### `MovieListPage.tsx`

1. **getMovies**
   - 목적: 현재 카테고리와 페이지에 맞는 영화 목록 데이터 가져오기
   - 동작 과정:
     - 로딩 상태 시작
     - 카테고리 경로 변환
     - `fetchMovies` 함수 호출
     - 결과 처리 (영화 목록, 총 페이지 수 설정)
     - 에러 처리
     - 로딩 상태 종료

2. **handlePageChange**
   - 목적: 페이지 변경 시 실행할 함수
   - 매개변수: `page` (새 페이지 번호)
   - 동작 과정:
     - 스크롤을 페이지 상단으로 이동
     - 현재 페이지 상태 업데이트

### `Pagination.tsx`

1. **calculatePageRange**
   - 목적: 현재 페이지 주변에 표시할 페이지 번호 계산
   - 로직: 현재 페이지를 중심으로 앞뒤로 일정 개수의 페이지 번호 생성

2. **renderPageNumbers**
   - 목적: 페이지 번호 버튼들을 렌더링
   - 로직: 페이지 범위를 순회하며 각 페이지에 대한 버튼 생성

3. **handleNextPage & handlePrevPage**
   - 목적: 다음/이전 페이지로 이동
   - 동작: 현재 페이지에서 1을 더하거나 빼서 `onPageChange` 콜백 호출
</details>
