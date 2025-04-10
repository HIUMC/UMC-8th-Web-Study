import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Outlet /> {/* 자식 라우터가 여기에 렌더링 됩니다 */}
    </div>
  );
};

export default HomePage;
