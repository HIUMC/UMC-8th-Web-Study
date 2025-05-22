# UMC Week8 Mission 1 - 프로젝트 아키텍처 및 플로우 분석

## 1. 프로젝트 개요

본 프로젝트는 사용자 인증(회원가입, 로그인, 소셜 로그인, 로그아웃), LP(Long Playing record) 정보 공유 및 관리(CRUD, 좋아요), 댓글 기능을 제공하는 웹 애플리케이션입니다. React Query를 활용한 효율적인 서버 상태 관리, Context API를 통한 전역 인증 상태 관리, TypeScript를 통한 타입 안정성 확보 등이 특징입니다.

## 2. 프로젝트 구조

주요 디렉토리 구조는 다음과 같습니다.

```
UMC-8th-Web-Study/경호호/week8/mission1/
├── public/                   # 정적 에셋
├── src/
│   ├── api/                  # 백엔드 API 연동 함수 (axios 기반)
│   ├── assets/               # 이미지, 폰트 등 에셋
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   └── layout/           # 헤더, 사이드바 등 레이아웃 컴포넌트
│   ├── constants/            # 상수 값 (예: React Query 키)
│   ├── contexts/             # React Context API (주로 인증 상태 관리)
│   ├── hooks/                # 커스텀 React Hooks (주로 React Query 래핑)
│   ├── lib/                  # 라이브러리, 유틸리티 (예: axios 인스턴스 설정)
│   ├── pages/                # 라우트별 페이지 컴포넌트
│   ├── schemas/              # 데이터 유효성 검증 스키마 (Zod)
│   ├── types/                # TypeScript 타입 정의
│   ├── App.tsx               # 메인 애플리케이션 컴포넌트, 라우팅 정의
│   ├── main.tsx              # 애플리케이션 진입점 (React DOM 렌더링, Provider 설정)
│   └── index.css             # 전역 CSS (Tailwind CSS 임포트 및 커스텀 스타일)
├── .gitignore                # Git 무시 파일 목록
├── index.html                # HTML 진입점
├── package.json              # 프로젝트 의존성 및 스크립트 정의
├── postcss.config.js       # PostCSS 설정 (Tailwind CSS, Autoprefixer)
├── tailwind.config.js        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 전체 설정
├── tsconfig.app.json         # TypeScript 애플리케이션 소스코드 설정
├── tsconfig.node.json        # TypeScript Node.js 환경 설정 (Vite 설정 파일 등)
└── vite.config.ts            # Vite 설정
```

## 3. 주요 기능 및 플로우

### 가. 인증 (Authentication)

*   **회원가입 (`SignupPage.tsx`)**
    1.  사용자는 이메일, 비밀번호, 이름 정보를 단계별로 입력합니다.
    2.  `react-hook-form`으로 폼 상태를 관리하고, `zod` (`authSchemas.ts`)로 유효성을 검사합니다.
    3.  유효성 검사 통과 후, `/v1/auth/signup` API 를 호출하여 서버에 사용자 정보를 전송합니다.
    4.  성공 시 로그인 페이지로 이동합니다.
*   **로그인 (`SigninPage.tsx`)**
    1.  사용자는 이메일과 비밀번호를 입력합니다.
    2.  `AuthContext`의 `login` 함수를 호출하여 `/v1/auth/signin` API로 서버에 인증을 요청합니다.
    3.  **Google 소셜 로그인**: "Google로 로그인" 버튼 클릭 시 `/api/v1/auth/google/Login` (vite 프록시 설정)으로 이동하여 Google OAuth 인증을 시작하고, 성공 시 콜백 URL (`/v1/auth/google/callback` 또는 `/oauth2/redirect`)로 리디렉션되어 `OAuthRedirectHandler.tsx`에서 토큰을 처리합니다.
    4.  로그인 성공 시 서버로부터 Access Token과 Refresh Token을 발급받습니다.
    5.  `AuthContext` (`AuthContext.tsx`)에서 토큰을 상태로 관리하고, `localStorage`에 저장합니다.
    6.  `axiosInstance` (`lib/axiosInstance.ts`)의 요청 헤더에 Access Token을 자동으로 추가합니다.
    7.  로그인 성공 후 홈 페이지로 이동합니다.
*   **로그아웃 (`Header.tsx`)**
    1.  사용자가 로그아웃 버튼을 클릭합니다.
    2.  `AuthContext`의 `logout` 함수 (내부적으로 `logoutMutation` 사용) 또는 `Header.tsx`의 `logoutMutation`을 통해 `/v1/auth/signout` API를 호출합니다.
    3.  `localStorage`에서 토큰을 제거하고, `AuthContext` 상태를 업데이트합니다.
    4.  `axiosInstance` 헤더에서 토큰을 제거하고, React Query 캐시를 클리어합니다.
    5.  홈 페이지로 리디렉션 후 페이지를 새로고침하여 상태를 완전히 초기화합니다.
*   **토큰 관리 및 자동 갱신 (`AuthContext.tsx`, `lib/axiosInstance.ts`)**
    1.  Access Token은 `localStorage`에 저장되며, 만료 시 `axiosInstance`의 응답 인터셉터에서 401 에러를 감지합니다.
    2.  401 에러 발생 시, `localStorage`에 저장된 Refresh Token을 사용하여 `/v1/auth/refresh` API로 새로운 Access Token 발급을 요청합니다.
    3.  새 Access Token 발급 성공 시, `localStorage`와 `AuthContext` 및 `axiosInstance` 헤더를 업데이트하고, 실패한 원래 요청을 재시도합니다.
    4.  Refresh Token도 만료되었거나 유효하지 않으면 로그아웃 처리됩니다.
*   **보호된 라우트 (`ProtectedRoute.tsx`)**
    1.  `AuthContext`의 `isLoggedIn` (또는 `isAuthenticated`) 상태를 확인합니다.
    2.  로그인되지 않은 사용자가 보호된 라우트 접근 시 로그인 페이지로 리디렉션합니다.

### 나. LP (Long Playing record)

*   **LP 목록 조회 (`HomePage.tsx`)**
    1.  `useInfiniteLPList` 커스텀 훅 (`hooks/useInfiniteLPList.ts`)을 사용하여 LP 목록을 무한 스크롤 방식으로 조회합니다.
    2.  이 훅은 내부적으로 `getLPList` API (`api/lp.ts`)를 호출합니다.
    3.  `LPCard` (`components/LPCard.tsx`) 컴포넌트를 사용하여 각 LP 정보를 표시합니다.
    4.  최신순/오래된순 정렬 기능을 제공합니다.
*   **LP 상세 조회 (`LPDetailPage.tsx`)**
    1.  `useParams`로 LP ID를 가져와 `useGetLPDetail` 훅 (`hooks/useGetLPDetail.ts`)을 호출합니다.
    2.  이 훅은 `getLPDetail` API (`api/lp.ts`)를 호출하여 특정 LP의 상세 정보를 가져옵니다.
    3.  LP 정보, 작성자 정보, 태그, 좋아요 수, 댓글 목록 등을 표시합니다.
*   **LP 생성 (`LPCreateModal.tsx` -> `HomePage.tsx`)**
    1.  사용자가 "LP 작성" 버튼을 클릭하면 모달이 열립니다.
    2.  제목, 내용, 태그, 썸네일 이미지를 입력/업로드합니다.
    3.  썸네일 이미지 업로드 시 `uploadProfileImage` API (`api/user.ts`)가 호출되어 이미지 URL을 받습니다.
    4.  `createLP` API (`api/lp.ts`)를 호출하여 서버에 LP 데이터를 저장합니다.
    5.  성공 시 LP 목록 쿼리를 무효화하여 목록을 갱신합니다.
*   **LP 수정 (`LPEditPage.tsx`)**
    1.  수정할 LP의 상세 정보를 `getLPDetail` API로 조회하여 폼에 기본값으로 채웁니다.
    2.  사용자가 정보를 수정한 후 저장하면, 변경된 썸네일 이미지가 있다면 `uploadProfileImage` API로 업로드합니다.
    3.  `updateLP` API (`api/lp.ts`)를 호출하여 서버 데이터를 수정합니다.
    4.  성공 시 해당 LP 상세 정보 및 LP 목록 쿼리를 무효화합니다.
*   **LP 삭제 (`LPDetailPage.tsx`)**
    1.  LP 작성자 본인일 경우 삭제 버튼이 노출됩니다.
    2.  삭제 확인 후 `deleteLP` API (`api/lp.ts`)를 호출합니다.
    3.  성공 시 LP 목록 쿼리를 무효화하고 홈 페이지로 이동합니다.
*   **LP 좋아요/좋아요 취소 (`LPDetailPage.tsx`)**
    1.  사용자가 좋아요 버튼을 클릭합니다.
    2.  `toggleLike` API (`api/lp.ts`)를 호출합니다. (내부적으로 현재 상태에 따라 좋아요 또는 좋아요 취소 API 호출)
    3.  Optimistic Update를 적용하여 UI에 즉시 반영하고, API 호출 성공/실패에 따라 상태를 확정하거나 롤백합니다.
    4.  LP 상세 정보 쿼리를 무효화하여 최신 상태를 반영합니다.

### 다. 댓글 (Comment)

*   **댓글 조회 (`LPDetailPage.tsx`)**
    1.  `useInfiniteComments` 훅 (`hooks/useInfiniteComments.ts`)을 사용하여 특정 LP의 댓글 목록을 무한 스크롤 방식으로 조회합니다.
    2.  이 훅은 `getCommentList` API (`api/comment.ts`)를 호출합니다.
    3.  최신순/오래된순 정렬 기능을 제공합니다.
*   **댓글 작성 (`LPDetailPage.tsx`)**
    1.  사용자가 댓글 내용을 입력하고 제출합니다.
    2.  `createComment` API (`api/comment.ts`)를 호출하여 댓글을 서버에 저장합니다.
    3.  성공 시 댓글 목록 쿼리를 무효화하여 목록을 갱신합니다.
*   **댓글 수정 (`LPDetailPage.tsx`)**
    1.  댓글 작성자 본인일 경우 수정 옵션이 제공됩니다.
    2.  `updateComment` API (`api/comment.ts`)를 호출하여 댓글을 수정합니다.
    3.  성공 시 댓글 목록 쿼리를 무효화합니다.
*   **댓글 삭제 (`LPDetailPage.tsx`)**
    1.  댓글 작성자 본인일 경우 삭제 옵션이 제공됩니다.
    2.  `deleteComment` API (`api/comment.ts`)를 호출합니다.
    3.  성공 시 댓글 목록 쿼리를 무효화합니다.

### 라. 사용자 프로필

*   **내 정보 조회 (`UsersMePage.tsx`)**
    1.  `getUserProfile` API (`api/user.ts`)를 호출하여 현재 로그인된 사용자의 프로필 정보를 조회합니다. (`/v1/users/me`)
*   **내 정보 수정 (`UsersMePage.tsx`)**
    1.  수정 모드에서 이름, 소개(bio), 프로필 이미지를 수정합니다.
    2.  프로필 이미지 변경 시 `uploadProfileImage` API로 업로드합니다.
    3.  `updateUserProfile` API (`api/user.ts`)를 호출하여 프로필 정보를 저장합니다. (`PATCH /v1/users`)
    4.  Optimistic Update 적용 및 성공 시 관련 쿼리 무효화.
*   **회원 탈퇴 (`Sidebar.tsx`)**
    1.  `deleteUser` API (`api/user.ts`)를 호출하여 `/v1/users`로 DELETE 요청을 보냅니다.
    2.  성공 시 로그아웃 처리 후 홈으로 리디렉션 및 페이지 새로고침.

## 4. 핵심 기술 스택 및 아키텍처 특징

*   **UI**: React (Vite 기반)
*   **언어**: TypeScript
*   **상태 관리**:
    *   **서버 상태**: `React Query (@tanstack/react-query)`
    *   **전역 클라이언트 상태**: `React Context API` (`AuthContext.tsx`) - 인증 상태
    *   **로컬 컴포넌트 상태**: `useState`, `useRef`, `useLocalStorage`
*   **라우팅**: `react-router-dom`
*   **HTTP 통신**: `axios` (인터셉터 사용한 토큰 관리)
*   **폼 처리 및 유효성 검사**: `react-hook-form`, `zod`
*   **스타일링**: `Tailwind CSS`, `PostCSS`
*   **API 설계**: RESTful, 도메인별 분리 (`api/` 디렉토리)
*   **코드 구조**: 기능별 모듈화, 커스텀 훅 사용
*   **타입 안전성**: TypeScript

## 5. 데이터 흐름 (예시: LP 목록 조회)

1.  **사용자**: `HomePage` 접속.
2.  **`HomePage.tsx`**: `useInfiniteLPList` 훅 호출.
3.  **`useInfiniteLPList` (`hooks/useInfiniteLPList.ts`)**: `React Query`의 `useInfiniteQuery` 사용, `getLPList` API 함수 호출.
4.  **`getLPList` (`api/lp.ts`)**: `axiosInstance`로 백엔드 서버 (`/v1/lps`) GET 요청.
5.  **`axiosInstance` (`lib/axiosInstance.ts`)**: 요청 인터셉터 (Access Token 주입).
6.  **백엔드 서버**: LP 목록 및 페이지네이션 정보 응답.
7.  **`axiosInstance`**: 응답 인터셉터 (401 시 토큰 갱신).
8.  **`getLPList`**: 응답 데이터 반환.
9.  **`useInfiniteLPList`**: React Query가 데이터 캐싱 및 상태 업데이트.
10. **`HomePage.tsx`**: 훅에서 받은 데이터로 UI 렌더링. 스크롤 시 `fetchNextPage`로 다음 페이지 요청.
