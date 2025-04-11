**컨테이너 계층 구조**:
   - `.container`: 전체 레이아웃을 감싸는 최상위 컨테이너
     - `.top`: HEADER와 MENU를 포함하는 상단 영역
     - `.hero`: 히어로 섹션
     - `main.content`: 메인 콘텐츠 영역 (MAIN, 빈 공간, IMAGE, EXTRA)
     - `.banner`: 하단 배너 영역

**Grid 레이아웃 구조**:
   - `.container`는 4개의 행을 가진 그리드로 설정됨
   - `grid-template-rows: auto auto 1fr auto;`로 각 섹션의 높이 비율 조정
   - `min-height: 100vh`로 전체 화면 높이 차지

**메인 콘텐츠 영역**:
   - 2x3 그리드 구조 (2행 3열)로 구성
   - MAIN: 왼쪽 2x2 영역 (1열, 1-2행)
   - 흰 빈공간: 중앙 1x2 영역 (2열, 1-2행)
   - IMAGE: 오른쪽 상단 (3열, 1행)
   - EXTRA: 오른쪽 하단 (3열, 2행)

**Flex 레이아웃**:
   - `.top`에 적용하여 HEADER와 MENU를 수평 배치
   - 각 콘텐츠 요소 내부에도 적용하여 텍스트 중앙 정렬

**Grid 레이아웃**:
   - 페이지 전체 구조와 메인 콘텐츠 영역에 적용
   - `grid-column`과 `grid-row` 속성으로 요소의 위치와 크기 지정

**정렬 기법**:
   - `justify-content: center`와 `align-items: center`로 모든 콘텐츠 중앙 정렬
   - `flex-grow: 1`을 통해 MENU가 남은 공간을 모두 차지하도록 설정



