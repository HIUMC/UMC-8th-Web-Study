//Outlet: 리액트 라우터에서 중첩라우트(중첩된 페이지 구조)를 만들 때 사용하는 컴포넌트

import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar.tsx"

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;