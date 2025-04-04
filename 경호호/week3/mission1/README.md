# 미션 1: 영화 API 호출 및 인기 영화 목록 구현

## 프로젝트 구조

```
src/
├── App.tsx                // 메인 애플리케이션 컴포넌트
├── components/
│   └── MovieCard.tsx      // 영화 카드 컴포넌트
└── types/
    └── movie.ts           // 영화 관련 타입 정의
```

## 기술 스택 및 라이브러리

- React
- TypeScript
- Axios: API 호출
- Tailwind CSS: 스타일링
- Vite: 빌드 도구

## 코드 구조 분석

### 타입 정의 (`types/movie.ts`)

영화 데이터 처리를 위한 TypeScript 인터페이스 정의

```typescript
// Movie 인터페이스: 개별 영화 정보 타입
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

// MovieApiResponse 인터페이스: API 응답 타입
export interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
```

### 메인 애플리케이션 (`App.tsx`)

인기 영화 목록을 가져와 표시하는 메인 컴포넌트

```typescript
function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      // API 호출 및 상태 관리 로직
    }

    fetchMovies()
  }, [])

  return (
    // UI 렌더링 로직
  )
}
```

#### 핵심 기능:

1. **상태 관리**
   - `movies`: 영화 목록 데이터 저장
   - `loading`: 로딩 상태 표시
   - `error`: 오류 메시지 저장

2. **API 호출 함수**
   - `fetchMovies`: TMDB API에서 인기 영화 목록 가져옴
   - 환경 변수(`VITE_TMDB_KEY`)를 사용해 API 키 관리
   - axios를 통한 HTTP 요청 구현
   - 에러 처리 및 로딩 상태 관리

3. **UI 구성**
   - 로딩 중 표시
   - 에러 메시지 표시
   - 그리드 레이아웃을 사용한 영화 카드 목록 표시
   - 반응형 그리드 레이아웃 (Tailwind의 `grid-cols` 활용)

### 영화 카드 컴포넌트 (`MovieCard.tsx`)

개별 영화 정보를 카드 형태로 표시하는 컴포넌트

```typescript
const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    // 영화 카드 UI 렌더링 로직
  );
};
```

#### 핵심 기능:

1. **상태 관리**
   - `isHovered`: 마우스 오버 상태 관리로 상세 정보 표시 제어

2. **이벤트 핸들링**
   - `onMouseEnter`, `onMouseLeave`: 호버 상태 토글

3. **UI 구성**
   - 영화 포스터 이미지 표시
   - 호버 시 영화 제목, 내용, 평점, 개봉연도 등 추가 정보 표시
   - CSS 트랜지션 효과 적용 (opacity, scale)

## 코드 작동 로직

1. **초기화 및 데이터 로딩**
   - 앱 마운트 시 `useEffect` 훅에서 `fetchMovies` 함수 실행
   - 로딩 상태를 `true`로 설정하고 API 호출 시작
   - TMDB API에서 인기 영화 데이터 요청 (`/movie/popular` 엔드포인트)
   - 요청 성공 시 `movies` 상태 업데이트 및 로딩 상태 종료
   - 오류 발생 시 `error` 상태에 오류 메시지 설정

2. **영화 목록 렌더링**
   - 로딩 중이면 로딩 표시
   - 에러가 있으면 에러 메시지 표시
   - 정상적으로 데이터를 가져오면 그리드 레이아웃에 영화 카드 목록 표시
   - 각 영화마다 `MovieCard` 컴포넌트 렌더링 (key로 영화 id 사용)

3. **영화 카드 상호작용**
   - 기본 상태: 영화 포스터만 표시
   - 마우스 오버 시: 오버레이 효과와 함께 영화 제목, 설명, 평점, 개봉연도 표시
   - 마우스 벗어날 시: 기본 상태로 복귀

## 함수 설명

### App.tsx

1. **fetchMovies (비동기 함수)**
   - 목적: TMDB API에서 인기 영화 목록 데이터 가져오기
   - 동작 과정:
     - axios를 사용하여 TMDB API 호출
     - 성공 시 `setMovies`로 영화 데이터 저장
     - 실패 시 `setError`로 오류 메시지 저장
     - 모든 경우에 `setLoading(false)`로 로딩 상태 종료

### MovieCard.tsx

1. **setIsHovered 상태 업데이트 함수**
   - 목적: 카드의 호버 상태 관리
   - 동작 과정: 
     - `onMouseEnter`에서 `true`로 설정
     - `onMouseLeave`에서 `false`로 설정
   - 효과: CSS 클래스 조건부 적용으로 오버레이 표시/숨김 전환

## 구현 내용
- useEffect를 활용한 API 데이터 로딩
- TypeScript 인터페이스를 사용한 타입 안전성 확보
- Tailwind CSS를 활용한 반응형 UI 구현
- 호버 효과를 구현하여 사용자 경험 향상

## ⚡ 트러블 슈팅

<details>
<summary>⚡이슈 No.1</summary>
  
- 문제 상황: TMDB API 호출 시 CORS 오류 발생
- 원인: 클라이언트 측에서 직접 API를 호출할 때 발생하는 교차 출처 리소스 공유(CORS) 제한
- 해결 방법: 프록시 서버를 설정하거나 TMDB API의 v4 대신 v3를 사용하여 해결함
</details>

<details>
<summary>⚡이슈 No.2</summary>
  
- 문제 상황: TypeScript에서 API 응답 데이터의 타입 정의가 어려움
- 원인: API에서 반환되는 데이터 구조가 복잡하고 중첩된 객체를 포함함
- 해결 방법: 인터페이스를 정의하고 필요한 속성만 선택적으로 사용하는 방식으로 해결
</details>

<details>
<summary>⚡이슈 No.3</summary>
  
- 문제 상황: 환경 변수(.env)가 Vite 프로젝트에서 인식되지 않음
- 원인: Vite에서는 환경 변수 이름 앞에 'VITE_' 접두사가 필요함
- 해결 방법: 환경 변수 이름을 'VITE_TMDB_KEY'로 수정하여 해결
</details>

## 📢 학습 회고

<details>
<summary>📢 학습 회고 내용</summary>
  
이해한 점:
- React에서 useEffect와 useState를 활용한 API 데이터 관리 방법
- TypeScript를 사용하여 데이터 타입을 정의하고 안전하게 처리하는 방법
- Tailwind CSS의 유틸리티 클래스를 사용한 UI 구현 방식
- 환경 변수를 통한 API 키 관리의 중요성

어려운 점 (개선 방법):
- 복잡한 API 응답 구조를 TypeScript로 타입화하는 과정 → TypeScript의 유틸리티 타입을 더 공부하고 활용하기
- Tailwind CSS의 클래스명이 길어져 가독성이 떨어지는 문제 → 컴포넌트 분리와 @apply 지시어 활용하기
- API 호출 시 로딩 상태와 에러 처리 구현의 어려움 → 상태 관리 라이브러리나 React Query 같은 도구 학습하기

회고:
- 처음으로 외부 API를 활용한 프로젝트를 구현하면서 실제 데이터를 다루는 경험을 쌓을 수 있었음
- TypeScript의 필요성을 체감했으며, 타입 안전성이 개발 생산성에 미치는 영향을 이해함
- 반응형 디자인의 중요성과 사용자 경험을 고려한 UI 설계의 가치를 알게 됨
</details>
