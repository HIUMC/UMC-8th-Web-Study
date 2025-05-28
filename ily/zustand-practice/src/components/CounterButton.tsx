import { useCounterActions, useCounterStore } from "../stores/counterStore";

export default function CounterButton() {
  //가독성 good, 모든 상태 관리 라이브러리에서도 동일한 패턴 사용 가능.
  const { increment, decrement } = useCounterActions();
  // const increment = useCounterStore((state) => state.actions.increment);
  // const decrement = useCounterStore((state) => state.actions.decrement);

  return (
    <>
      <button onClick={increment}>증가</button>
      <button onClick={decrement}>감소</button>
    </>
  );
}
