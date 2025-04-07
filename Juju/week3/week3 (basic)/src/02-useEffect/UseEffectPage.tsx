import { useEffect, useState } from "react";

export default function UseEffectPage() {
    const [count, setCount] = useState(0);

    const handleIncrease = () : void => {
        setCount((prev) => prev + 1);

        // 얘는 비동기식 처리이므로, 실제 개발자도구 console에서 확인하면:
        // handleIncrease가 화면에서 업데이트되기 전의 값이 나옴.
        //console.log(count);
    };

    useEffect(() : void => {
        // 함수 내부: 실행하고 싶은 코드
        console.log(count);

        // (optional) return function

        // cleanup function : (optional) return function과 유사하다
        return () : void => {
            console.log("청소하는 함수입니다.");
        };

    }, [count]); // 의존성 배열
    /*
        의존성 배열이 비어있으면: mounted될 때만 실행됨.
        위 [ ] 안에 count를 넣어줌으로써, count 값이 바뀔 때마다 실행되도록 해주었음.
        즉, count가 바뀔 때마다 console.log(count)가 실행됨.

        위의 handeIncrease 함수 내에 console.log(count)를 입력했을 때와는 달리,
        useEffect는 비동기식으로 처리되지 않고, count값이 바뀔 때마다 return 반환까지 모두 실행된 후의
        새로 업데이트된 값이 나오는 것을 확인할 수 있음.
    */
    
    return (
        <div>
            <h3>UseEffectPage</h3>
            <h1>{count}</h1>
            <button onClick={handleIncrease}>증가</button>
        </div>
    );
}