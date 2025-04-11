# 4주차 미션 1: 커스텀 훅으로 영화 데이터 불러오기

## 📋 개요
Chapter 3에서 만든 영화 페이지들을 `Custom-Fetch-Hook`을 활용해 리팩토링하는 미션
영화 데이터 API 호출 로직을 커스텀 훅으로 분리하고, 로딩 및 에러 처리 구현

## 🎯 목표
- 커스텀 훅 개념 및 사용법 이해
- API 호출 로직을 재사용 가능한 커스텀 훅으로 분리
- 로딩 상태와 에러 처리 효율적으로 관리
- 컴포넌트와 비즈니스 로직 분리

## ✅ 구현 요구사항
- CustomFetch Hook 구현 및 사용
- 로딩/에러 처리 적절히 진행
- 모든 GET 요청에 CustomFetch Hook 적용

## 📂 프로젝트 구조
(프로젝트 구조 설명은 유지하되, 실제 코드는 제거)
```
src/
├── assets/                 # 정적 에셋 (이미지 등)
├── components/             # 재사용 UI 컴포넌트 (ErrorDisplay, Layout, LoadingSpinner, MovieCard, Navbar, Pagination)
├── hooks/                  # 커스텀 훅 (useFetch, useMovies)
├── pages/                  # 페이지 컴포넌트 (HomePage, MovieDetailPage, MovieListPage)
├── services/               # API 서비스 로직 (movieService)
├── types/                  # TypeScript 타입 정의 (movie)
├── App.css                 # App 컴포넌트 스타일
├── App.tsx                 # 메인 애플리케이션 컴포넌트
├── index.css               # 전역 스타일
├── main.tsx                # 애플리케이션 진입점
└── vite-env.d.ts           # Vite 환경 타입 정의
```

## 🛠️ 구현 내용

### 1. `useFetch` 커스텀 훅 구현
- 범용 데이터 fetching 로직 담당
- Axios로 비동기 요청 처리, 로딩/에러 상태 관리, `refetch` 함수 제공
- URL 또는 옵션 변경 시 데이터 자동 refetch

### 2. `useMovies` 커스텀 훅 구현
- `useFetch` 훅을 사용해 특정 카테고리 영화 목록 데이터 가져옴
- 카테고리별 영화 목록 조회, 페이지네이션 지원

### 3. 영화 목록 페이지 (`MovieListPage.tsx`) 리팩토링
- `useMovies` 훅으로 영화 목록 데이터 가져오기
- 로딩/에러 상태에 따라 UI 렌더링 (로딩 스피너, 에러 메시지, 영화 목록, 페이지네이션)

### 4. 영화 상세 페이지 (`MovieDetailPage.tsx`) 리팩토링
- `useFetch` 훅을 직접 사용해 특정 영화 상세 정보 가져오기
- 로딩/에러 상태 처리 (다시 시도 버튼 포함)

### 5. 로딩 및 에러 처리 컴포넌트
- `LoadingSpinner.tsx`: 로딩 중 시각적 표시
- `ErrorDisplay.tsx`: 에러 발생 시 메시지 표시

## 💡 커스텀 훅의 이점 및 학습 내용

### 커스텀 훅이란?
- React 내장 훅(`useState`, `useEffect` 등)을 조합해 특정 로직을 캡슐화하고 재사용 가능하게 만든 JavaScript 함수
- 이름은 "use"로 시작

### 커스텀 훅 사용의 이점
1.  **코드 재사용성 향상**: 데이터 가져오기 로직 재사용
2.  **관심사 분리**: 데이터 fetching, 로딩, 에러 처리 로직을 UI 컴포넌트에서 분리하여 가독성 및 유지보수성 향상
3.  **일관된 상태 관리**: 로딩/에러 상태 일관되게 처리
4.  **테스트 용이성**: 로직 분리로 독립적 테스트 용이

### 학습 성과
- React 커스텀 훅 설계 및 구현 방법 이해 및 적용
- 비동기 데이터 처리 관련 상태(데이터, 로딩, 에러) 효과적 관리 방법 학습
- 컴포넌트 로직과 비즈니스 로직 분리의 중요성 이해
