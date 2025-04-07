/* 워크북 필기 내용 */

import './App.css'
import List from './components/List'; //List component import


function App() {
  {/* 로컬 변수 선언 */}
  const nickname = '매튜'
  const sweetPotato = '고구마'

  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']

  return (
    <>
     {/* className을 활용한 스타일링 */}
     <strong className='school'>상명대학교</strong>

     {/* Inline-Styling을 활용한 스타일링
      - 중괄호 두 번 연후, 카멜 표기법 사용하여 css 코드 작성.
      - 바깥 중괄호: 자바스크립트 문법임을 나타냄.
      - 안쪽 중괄호: 자바스크립트 객체임을 나타냄.*/}

      {/* 로컬 변수 nickname에 접근: 중괄호{} 사용 */}
     <p style = {{color: 'purple', fontWeight: 'bold', fontSize:'3rem'}}>
        {nickname}/김용민
     </p>

     {/* 문자열과 함께 변수 사용하기: 중괄호{}과 ``를 활용 */}
     <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>

     {/* 배열의 요소를 나타내는 방법 ; map() 메서드 활용
      - for문과 같은 반복문 대신에, map() 메서드를 활용할 수 있다.
      - map은 yaho를 인자로 받아서 값을 반환한다.
      - 중괄호를 사용한 경우에는 꼭 return을 태그 앞에 적어야 반환되는 값이 제대로 보인다. 소괄호를 활용한 경우에는 return을 생략할 수 있다.
      - map을 활용할 때는 key라는 props를 설정해야 한다. key값은 각 원소마다 가지고 있는 고유값으로 설정한다.
      */}
     <ul>
        {array.map((yaho, idx) => (
          // return <li key={idx}>{yaho}</li>
          <List key={idx} tech={yaho}/> // List component 호출
        ))}
     </ul>
    </>
  )
}

export default App
