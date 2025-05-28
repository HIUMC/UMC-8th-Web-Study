import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CounterActions {
  increment: () => void;
  decrement: () => void;
  random: () => void;
}

//상태에 대한 정의
export interface CounterState {
  //count
  count: number;
  //randomNumber
  randomNumber: number;

  //action
  actions: CounterActions;
}

//zustand에서는 다양한

export const useCounterStore = create<CounterState>()(
  devtools((set) => ({
    //이렇게 했을 떄 anonymous function의 명명이 생김.
    //이렇게만 해줘도 devtools셋팅이 끝난 것임.
    count: 0,
    randomNumber: 0,

    actions: {
      increment: () =>
        // set(partialOrUpdater, shouldReplace = false, ationName8
        set(
          (state): { count: number } => ({
            count: state.count + 1,
          }),
          false, //true 라고 하면 에러가 남. -> 기본 값이 false가 나오기 때문임.
          "increment",
        ), // 정말 값을 쉽게 바꿀 수 있는 방법이 존재함.

      //

      decrement: () =>
        set(
          (state): { count: number } => ({
            count: state.count - 1,
          }),
          false,
          "decrement",
        ),

      random: () =>
        set((): { randomNumber: number } => ({
          randomNumber: Math.floor(Math.random() * 100), // Generates a random number between 0 and 99
        })),
    },
  })),
);

//actions 에 관한 훅을 하나 만들 수 있음.
export const useCounterActions = () =>
  useCounterStore((state) => state.actions); // 이 객체만 가지고 있는 것임. 한 번만 생성을 하는 것이다.?

//atmoic selector => 모든 값은 개별로 꺼내야한다는 규칙.

//actions의 객체는 한 번 정의했기에 함수의 참조(reference)가 바뀌지 않음.

//컴포넌트가 항상 동일한 객체를 참조하기 때문에 렌더링에 문제가 발생하지 않음.
// 테스트 용이, 재사용성도 좋아짐.

//Redux  이전 상태를 잃어버린 다는 것, Immer library는 이전 상태를 참조하기 때문에 불러올 수 있음. devtools
