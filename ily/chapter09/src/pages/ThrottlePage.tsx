import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  //이렇게 작성하면 매 변경 때마다 데이터에 요청이 가기 때문에 부하가 발생함.
  //   () => {
  //   setScrollY(window.scrollY); // input값이 변경 됐을 때는 onChange를 이용했는데 이렇게 막 뭐 전달할 게 마땅히 없을 때는 useEffect를 이용해서 전달할 수 있다.
  // };

  //이렇게 하면 매 변경이 일어났을 때마다 rendering일 발생해서 매번 엄청난 양의 데이터 요청을 보낼 수밖에 없음
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    //cleanup함수, 컴포넌트가 unmount되거나 의존성 변경 시 이전 effect제거
  }, [handleScroll]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center ">
      <div>
        <h1>what is throttling?</h1>
        <p>ScrollY : {scrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
