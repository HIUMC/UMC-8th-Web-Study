# 4주차 스터디: Custom Hook 활용

## Mission 1: Custom Hook으로 영화 데이터 불러오기

### 코드 구조 및 작동 로직
- **구조 계층:**
    - `App.tsx`: 라우팅 설정 및 기본 레이아웃 제공
    - `pages`: `MovieListPage`, `MovieDetailPage` 등 페이지 단위 컴포넌트. 각 페이지는 필요한 데이터를 커스텀 훅을 통해 요청하고 UI를 렌더링
    - `hooks`: `useFetch` (범용 데이터 요청 로직), `useMovies` (영화 목록 데이터 요청 특화 로직). 데이터 상태, 로딩 상태, 에러 상태 관리
    - `components`: `MovieCard`, `Pagination`, `LoadingSpinner`, `ErrorDisplay` 등 재사용 가능한 UI 요소
    - `services`: `movieService.ts` (API 경로 생성 등 영화 관련 유틸리티 함수)
    - `types`: 영화 데이터 관련 TypeScript 타입 정의
- **작동 로직:**
    1. 사용자가 특정 영화 목록 페이지나 상세 페이지로 이동하면 해당 페이지 컴포넌트가 렌더링됨
    2. 페이지 컴포넌트(`MovieListPage`, `MovieDetailPage`)는 마운트 시 각각 `useMovies` 또는 `useFetch` 훅을 호출하여 필요한 데이터 요청 시작
    3. 커스텀 훅 내부에서는 `useEffect` 훅을 사용하여 컴포넌트 마운트 또는 의존성 변경 시 Axios 라이브러리를 통해 TMDB API로 비동기 데이터 요청 전송. 동시에 `loading` 상태를 true로 설정하여 로딩 중임을 알림
    4. API 요청 성공 시: 응답 데이터를 `data` 상태에 저장하고, `loading` 상태를 false로, `error` 상태를 null로 업데이트
    5. API 요청 실패 시: 발생한 에러 정보를 `error` 상태에 저장하고, `loading` 상태를 false로, `data` 상태를 null로 업데이트
    6. 페이지 컴포넌트는 커스텀 훅에서 반환된 `data`, `loading`, `error` 상태 값을 받아 UI를 조건부로 렌더링. 로딩 중일 때는 `LoadingSpinner`, 에러 발생 시에는 `ErrorDisplay`, 데이터가 성공적으로 로드되면 영화 정보(`MovieCard` 등)를 표시
    7. `MovieListPage`에서는 `Pagination` 컴포넌트와 상호작용하여 페이지 번호 변경 시 `setCurrentPage` 함수를 호출. 이로 인해 `currentPage` 상태가 변경되고, `useMovies` 훅이 새로운 페이지 번호로 데이터를 다시 요청
    8. `MovieDetailPage`에서는 에러 발생 시 '다시 시도' 버튼을 제공하며, 이 버튼 클릭 시 훅에서 반환된 `refetch` 함수를 호출하여 동일한 API 요청을 다시 시도

### 학습 내용 및 공유 사항
- Custom Hook 개념 및 필요성: 반복되는 로직(데이터 fetching, 상태 관리)을 별도의 함수로 분리하여 재사용성을 높이고, 컴포넌트 코드를 간결하게 유지 (관심사 분리)
- 비동기 데이터 Fetch 로직 캡슐화: `useState`로 데이터, 로딩, 에러 상태를 관리하고, `useEffect` 내에서 비동기 함수(Axios 요청)를 호출하여 데이터를 가져오는 패턴 학습
- 로딩 및 에러 상태 처리: 사용자에게 현재 데이터 요청 상태를 명확히 보여주고(로딩 스피너), 오류 발생 시 적절한 메시지(에러 컴포넌트)를 표시하는 방법 구현
- Axios 활용: Promise 기반 HTTP 클라이언트인 Axios를 사용하여 API 요청 보내기, 응답 및 에러 처리 (특히 `AxiosError` 타입 가드를 사용하여 네트워크 에러와 API 자체 에러 구분)
- `useEffect` 의존성 배열 관리: API 요청 URL이나 옵션(파라미터 등)이 변경될 때마다 데이터를 다시 가져오도록 의존성 배열을 설정. 객체나 배열 타입의 의존성은 참조가 변경될 때만 효과가 발생하므로, 필요시 `JSON.stringify` 등을 활용하여 값 기반 비교 효과 구현
- 커스텀 훅 조합: 특정 도메인(영화 목록)에 특화된 `useMovies` 훅 내부에서 범용적인 `useFetch` 훅을 재사용하여 코드 중복 최소화
- 환경 변수 활용: API 키와 같이 민감하거나 환경별로 달라질 수 있는 정보를 `.env` 파일에 저장하고 `import.meta.env`를 통해 안전하게 접근

## Mission 2: useForm Hook으로 로그인 기능 구현

### 코드 구조 및 작동 로직
- **구조 계층:**
    - `App.tsx`: React Router를 사용하여 `/login` 경로에 `LoginPage` 컴포넌트 매핑
    - `pages`: `LoginPage` 컴포넌트가 로그인 폼 UI를 구성하고, `useForm` 훅을 사용하여 폼 관련 로직 처리
    - `hooks`: `useForm` 커스텀 훅이 폼의 값(values), 에러(errors), 제출 상태(isSubmitting), 유효성(isValid) 상태를 관리하고, 입력 변경(handleChange) 및 제출(handleSubmit) 핸들러 제공
    - `components`: (선택 사항) 폼 요소 등 재사용 가능한 UI 컴포넌트 정의 가능
- **작동 로직:**
    1. `LoginPage` 컴포넌트가 렌더링될 때 `useForm` 훅을 호출하여 초기화. 이때 폼 필드의 초기값과 각 필드에 대한 유효성 검사 함수(예: `validateEmail`, `validatePassword`)를 인자로 전달
    2. 폼 내부의 `input` 요소들은 `value` 속성을 `useForm`에서 반환된 `values` 객체의 해당 필드 값에 바인딩하고, `onChange` 이벤트 핸들러로 `useForm`의 `handleChange` 함수를 연결
    3. 사용자가 `input` 필드에 값을 입력하면 `onChange` 이벤트 발생, 연결된 `handleChange` 함수 호출
    4. `handleChange` 함수 내부:
        - 이벤트 객체(`e`)로부터 변경된 필드 이름(`name`)과 값(`value`)을 가져와 `values` 상태 업데이트
        - 해당 필드에 대한 유효성 검사 함수 실행
        - 검사 결과에 따라 `errors` 상태 객체의 해당 필드 값 업데이트 (유효하면 `null`, 아니면 에러 메시지 문자열)
    5. `LoginPage` 컴포넌트는 `errors` 상태 객체를 실시간으로 참조하여, 특정 필드에 에러가 있으면 해당 에러 메시지를 화면에 표시하고, 입력 필드의 테두리 색상 등을 변경하여 시각적 피드백 제공
    6. `useForm` 훅은 내부적으로 `values`와 `errors` 상태를 종합하여 전체 폼의 유효성(`isValid`) 상태를 계산 (모든 필드 값이 비어있지 않고, 모든 필드의 에러가 `null`인지 확인)
    7. `LoginPage`의 로그인 버튼(`button[type="submit"]`)은 `disabled` 속성을 `!isValid || isSubmitting` 조건으로 제어. 즉, 폼 전체가 유효하고 현재 제출 중이 아닐 때만 버튼 활성화
    8. 사용자가 로그인 버튼을 클릭하여 폼을 제출하면, `form` 요소의 `onSubmit` 이벤트 핸들러로 연결된 `handleSubmit(handleLoginSubmit)` 함수 호출
    9. `handleSubmit` 함수 내부:
        - `event.preventDefault()` 호출하여 기본 폼 제출 동작 방지
        - `isSubmitting` 상태를 true로 설정 (버튼 비활성화 및 로딩 표시 등에 사용)
        - `useForm` 내부에서 모든 필드에 대한 유효성 검사를 다시 실행
        - 모든 필드가 유효하면(`formIsValid`), 인자로 받은 콜백 함수(`handleLoginSubmit`)를 현재 `values` 객체와 함께 호출. 이 콜백 함수는 실제 로그인 API 요청 등 비동기 작업 수행 가능
        - 콜백 함수 실행 완료 후 (또는 유효성 검사 실패 시) `isSubmitting` 상태를 false로 설정

### 학습 내용 및 공유 사항
- 복잡한 폼 상태 관리 추상화: 여러 입력 필드의 값, 각 필드의 유효성 에러 메시지, 폼 전체의 제출 가능 상태, 제출 진행 중 상태 등을 하나의 커스텀 훅(`useForm`)으로 묶어 관리하는 방법 학습
- 제네릭 활용: `useForm<T extends FormValues>`와 같이 제네릭을 사용하여 다양한 형태의 폼 데이터 구조에 대응하고, 타입스크립트의 타입 추론 및 안정성 혜택 활용
- React 이벤트 타입 활용: `ChangeEvent<HTMLInputElement | HTMLTextAreaElement>`, `FormEvent<HTMLFormElement>` 등 React에서 제공하는 이벤트 타입을 정확히 사용하여 타입 안정성 확보 및 자동 완성 기능 활용
- `useCallback` 활용: `handleChange`, `handleSubmit`과 같이 자식 컴포넌트나 `useEffect` 의존성 배열에 전달될 수 있는 함수들을 `useCallback`으로 메모이제이션하여 불필요한 리렌더링 방지 (단, 의존성 배열을 정확히 명시하는 것이 중요)
- 실시간 유효성 검사 및 피드백: 사용자 입력에 따라 즉각적으로 유효성을 검사하고, 결과를 에러 메시지 표시나 입력 필드 스타일 변경(예: 테두리 색상) 등으로 사용자에게 알려주는 UX 개선 방법 구현
- 조건부 UI 제어: 폼의 유효성 상태(`isValid`)나 제출 진행 상태(`isSubmitting`)에 따라 버튼의 `disabled` 속성을 동적으로 변경하여 사용자 인터랙션 제어
- 폼 제출 로직 분리: 실제 폼 제출 시 수행할 로직(예: API 호출)을 `useForm` 훅 외부의 콜백 함수(`handleLoginSubmit`)로 분리하여 전달함으로써, 훅의 범용성을 높이고 컴포넌트의 책임 분담

## Mission 3: useForm Hook 재사용하여 회원가입 기능 구현

### 코드 구조 및 작동 로직
- **구조 계층:** Mission 2와 기본 구조는 유사하나, `SignupPage` 컴포넌트 내부에 다단계 폼 로직이 추가됨
    - `App.tsx`: React Router를 사용하여 `/signup` 경로에 `SignupPage` 컴포넌트 매핑
    - `pages`: `SignupPage` 컴포넌트가 현재 회원가입 단계(`step`) 상태를 관리하고, 단계에 따라 다른 UI를 조건부 렌더링. `useForm` 훅을 재사용하여 전체 폼 데이터(이메일, 비밀번호) 관리
    - `hooks`: Mission 2에서 만든 `useForm` 커스텀 훅을 그대로 가져와 재사용
- **작동 로직:**
    1. `SignupPage` 컴포넌트는 `useState` 훅을 사용하여 현재 진행 중인 회원가입 단계를 나타내는 `step` 상태를 관리 (초기값: `'email'`)
    2. `useForm` 훅을 호출하여 이메일과 비밀번호 필드를 포함하는 전체 폼의 상태(`values`, `errors`, `isSubmitting`, `isValid`, `isFieldValid`)를 관리. 유효성 검사 규칙도 함께 전달
    3. `step` 상태 값에 따라 화면에 표시될 UI가 결정됨 (조건부 렌더링):
        - `step === 'email'`: 이메일 입력 필드와 '다음' 버튼 표시
        - `step === 'password'`: 이전 단계에서 입력한 이메일 확인 텍스트, 비밀번호 입력 필드, '회원가입' 버튼 표시
    4. **이메일 입력 단계 (`step === 'email'`):**
        - 이메일 `input` 요소는 `values.email` 및 `handleChange`에 바인딩됨
        - '다음' 버튼의 `disabled` 속성은 `!isFieldValid('email')` 조건을 통해 제어됨. 즉, `useForm` 훅이 관리하는 이메일 필드의 유효성 상태(`isFieldValid`)가 true일 때만 버튼 활성화
        - '다음' 버튼 클릭 시 `handleNextStep` 함수 호출. 이 함수는 이메일 필드가 유효한지 확인 후, `setStep('password')`를 호출하여 다음 단계로 상태 전환
    5. **비밀번호 입력 단계 (`step === 'password'`):**
        - 이전 단계에서 `useForm`의 `values` 상태에 저장된 이메일(`values.email`)을 화면에 텍스트로 표시
        - 비밀번호 `input` 요소는 `values.password` 및 `handleChange`에 바인딩됨
        - '회원가입' 버튼의 `disabled` 속성은 `!isValid || isSubmitting` 조건을 통해 제어됨. 즉, `useForm` 훅이 관리하는 전체 폼의 유효성(`isValid`)이 true이고, 현재 제출 중(`isSubmitting`)이 아닐 때만 버튼 활성화
        - 사용자가 '회원가입' 버튼을 클릭하여 폼을 제출하면, `handleSubmit(handleSignupSubmit)` 함수 호출. `useForm` 내부에서 전체 폼(이메일, 비밀번호 모두)의 유효성을 최종 검사한 후, 유효하다면 `handleSignupSubmit` 콜백 함수를 실행하여 실제 회원가입 처리 로직 수행 (예: API 호출)

### 학습 내용 및 공유 사항
- 커스텀 훅의 강력한 재사용성: 이전 미션에서 만든 `useForm` 훅을 코드 수정 없이 그대로 가져와 다른 기능(회원가입) 및 다른 UI 구조(다단계 폼)에 적용하는 경험
- `useState`를 이용한 상태 관리 확장: 컴포넌트 내의 특정 상태(여기서는 회원가입 단계 `step`)를 관리하기 위해 `useState`를 `useForm`과 함께 사용하는 방법 학습
- 조건부 렌더링 심화: 상태 값(`step`)에 따라 완전히 다른 UI 구조(다른 입력 필드와 버튼)를 보여주는 다단계 폼 구현
- 커스텀 훅 상태의 다양한 활용: `useForm`에서 제공하는 상태 중, 특정 필드의 유효성(`isFieldValid`)은 단계 전환 조건에 사용하고, 전체 폼의 유효성(`isValid`)은 최종 제출 버튼 활성화 조건에 사용하는 등, 상황에 맞게 상태를 선택적으로 활용하는 방법 이해
- 다단계 폼 인터랙션 구현: '다음' 버튼 클릭 시 상태 변경을 통해 다음 단계 UI를 보여주고, '뒤로 가기' 버튼 클릭 시 이전 단계로 돌아가거나 페이지를 벗어나는 로직 구현
- Tailwind CSS 설정 이해: `index.css` 파일에 `@tailwind` 지시문을 포함하고 이를 `main.tsx`에서 임포트하여 Tailwind 스타일을 전역적으로 적용하는 방식 이해
