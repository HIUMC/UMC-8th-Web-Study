import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0); // 초기값 0

  // 1씩 증가
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // 1씩 감소
  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <div>
        <button onClick={handleIncrement}>+1 증가</button>
        <button onClick={handleDecrement}>-1 감소</button>
      </div>
    </>
  );
}

export default App;
