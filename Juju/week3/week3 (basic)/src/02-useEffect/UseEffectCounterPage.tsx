import { useEffect, useState } from 'react';

export default function Parent() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <h1>같이 배우는 리액트 #2 useEffect</h1>
            <button onClick={() : void => setVisible(!visible)}>
                {visible ? '숨기기' : '보이기'}
            </button>
            {visible && <Child />}
            {/* 
                visible이 true일 때만 <Child/>가 렌더링됨.
                false일 때는 렌더링되지 않음.
            */}
        </>
    );
}

function Child() {
    /*
    useEffect(() : void => {
        let i = 0;
        setInterval(() : void => {
            console.log('Number => ' + i);
            i++;
        }, 1_000);
    }, []);
    */
    
    // 위의 코드대로 작성한 후, 브라우저에서 보이기를 누르면 콘솔 창에 1초마다 Number => 0, 1, 2, ...가 찍힘.
    // 근데 숨기기를 눌러도 계속 찍히는 문제가 발생함.
    // 여기서 다시 보이기를 누르면 타이머가 2개가 돌기 시작함.
    // 즉, 타이머가 계속 쌓이는 문제가 발생함.

    // 이 문제를 해결하기 위해서는, 타이머를 정리해주는 cleanup function을 사용해야 함.

    useEffect(() : void => {
        let i = 0;
        const counterInterval = setInterval(() : void => {
            console.log('Number => ' + i);
            i++;
        }, 1_000);

        return () : void => {
            console.log("언마운트 될 때 실행됩니다.");
            clearInterval(counterInterval); // cleanup function: 얘를 써야 정상적으로 작동함.
        }
    }, []);

    return <div className='mt-20 text-4xl'>child</div>;
}