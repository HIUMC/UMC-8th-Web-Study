// 인터페이스 ListProps 정의
interface ListProps {
    tech: string;   // tech라는 문자열 타입의 props를 가진다.
}

// React 함수형 컴포넌트 선언
// 구조 분해 할당을 사용하여 props에서 tech 값을 바로 받아 사용함.
const List = ({ tech }: ListProps) => {
    // tech의 값을 <li> 태그 안에 삽입하여 리스트 항목을 출력함.
    // 동적인 데이터를 리스트 아이템으로 렌더링하는 역할을 함.
    return <li>{tech}</li>;
};
  
// List 컴포넌트를 외부에서 사용할 수 있도록 export
export default List;  