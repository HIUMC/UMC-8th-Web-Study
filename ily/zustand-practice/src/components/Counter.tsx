import { useCounterStore } from "../stores/counterStore";
import CounterButton from "./CounterButton";

export default function Counter() {
  //  const { count, increament, decreament } = useCounterStore((state) => state);
  //위와 같이 코드를 작성하면 지속적으로 useCounterStore가 호출되기 때문에 rerender 과정에서 전체의 useCounter를 거쳐야 함 -> 불필요한 리렌더링

  const count = useCounterStore((state) => state.count);

  return (
    <>
      <h1>{count}</h1>
      <CounterButton />
    </>
  );
}
