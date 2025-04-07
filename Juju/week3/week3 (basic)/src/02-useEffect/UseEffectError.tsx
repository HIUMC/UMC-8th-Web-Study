import { useEffect, useState } from "react";

export default function UseEffectError() {
    const [counter, setCounter] = useState(0);

    const handleIncrease = () : void => {
        setCounter((counter) => counter + 1);
    };

    useEffect(() => {
        // 이 안에 setCounter를 넣으면 무한루프에 빠짐.
        // setCounter((counter) : number => counter + 1);
    });
    return <div onClick={handleIncrease}>{counter}</div>;
}