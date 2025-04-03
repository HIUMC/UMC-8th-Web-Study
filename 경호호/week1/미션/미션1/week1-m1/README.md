
src/
├── components/
│   ├── TodoForm.tsx - 할 일 입력 폼 컴포넌트
│   ├── TodoList.tsx - 할 일 목록 표시 컴포넌트
│   └── TodoItem.tsx - 개별 할 일 항목 컴포넌트
├── App.tsx - 메인 애플리케이션 컴포넌트
├── App.css - 스타일링
├── types.ts - 타입 정의
└── index.tsx - 엔트리 포인트

### 상태 관리

- React의 `useState` 훅을 사용하여 Todo 항목들의 상태를 관리
- 각 Todo 항목은 `id`, `text`, `completed` 속성 
- 상태 업데이트 함수(`addTodo`, `toggleTodo`, `deleteTodo`)를 통해 Todo 목록을 조작

