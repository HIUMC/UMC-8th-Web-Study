# 4주차 미션 3: 회원가입 기능 구현

## 📋 개요
미션 2에서 만든 `useForm` 커스텀 훅 재사용해서 다단계 회원가입 페이지 구현하는 미션
첫 단계에서 이메일 입력받고, 유효성 검사 후 다음 단계로 넘어가 비밀번호 입력받는 구조

## 🎯 목표
- `useForm` 커스텀 훅 재사용
- 다단계 폼 UI 및 로직 구현
- 단계별 유효성 검사 및 버튼 활성화/비활성화 처리
- React Router 페이지 라우팅 활용

## ✅ 구현 요구사항
- `/signup` 경로에 회원가입 페이지 연결
- 잘못된 이메일 입력 시 에러 메시지 표시
- 올바른 이메일 조건 충족 시 "다음" 버튼 활성화
- "다음" 버튼 클릭 시 비밀번호 입력 단계로 전환 (이전 입력 이메일 표시)
- 비밀번호 짧으면 에러 메시지 표시
- 비밀번호 조건 충족 시 "회원가입" 버튼 활성화
- 미션 2의 `useForm` Hook 활용

## 📂 프로젝트 구조

```
src/
├── components/             # (필요시 추가) 재사용 UI 컴포넌트
├── hooks/                  # 커스텀 훅 (useForm - 미션 2에서 복사)
├── pages/                  # 페이지 컴포넌트 (SignupPage - 다단계 폼)
├── App.tsx                 # 메인 애플리케이션 컴포넌트 (라우팅 설정)
├── index.css               # 전역 스타일 (Tailwind CSS 포함)
└── main.tsx                # 애플리케이션 진입점
```

## 🛠️ 구현 내용

### 1. `useForm` 커스텀 훅 (`src/hooks/useForm.ts`)
- 미션 2에서 구현한 `useForm` 훅 그대로 재사용
- 폼 값, 에러, 제출 상태, 전체 유효성(`isValid`), 특정 필드 유효성(`isFieldValid`) 등 관리

### 2. 회원가입 페이지 (`src/pages/SignupPage.tsx`)
- `useState`로 현재 회원가입 단계 관리 (`email` 또는 `password`)
- `useForm` 훅으로 이메일/비밀번호 상태 및 유효성 관리
- **주요 기능**: `useState`로 단계 관리, `useForm` 훅 재사용, 단계별 UI 조건부 렌더링, `isFieldValid` 및 `isValid`를 이용한 버튼 활성화 로직 구현

### 3. 라우팅 설정 (`src/App.tsx`)
- React Router로 `/signup` 경로에 `SignupPage` 컴포넌트 연결

## 💡 학습 내용
- 커스텀 훅(`useForm`)을 다른 프로젝트/기능에서 재사용하는 방법 학습
- `useState`로 다단계 폼 상태(현재 단계) 관리 방법 이해
- 단계별 필요 유효성 검사(`isFieldValid`)와 전체 폼 유효성(`isValid`) 구분 사용 방법 학습
- 조건부 렌더링으로 단계별 UI 동적 표시 방법 구현
