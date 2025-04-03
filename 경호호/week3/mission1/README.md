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
