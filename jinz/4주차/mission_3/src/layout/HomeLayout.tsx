import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return(
       <div className="h-dvh flex flex-col"> {/*전체 높이 설정*/}
            <nav>네비게이션 바</nav>
            <main className="flex-1"> {/*flex-1은 남은 공간을 다 차지함*/}
                <Outlet/> {/*children을 렌더링 ㅇㅇ, outlet이 항상 바뀌는 요소들*/}
            </main>
            <footer>푸터...</footer>
        </div>
    )
        
}

export default HomeLayout;