import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}
      <div
        className={`min-h-screen ${
          isHomePage ? "bg-[#1E3A5F]" : "bg-[#F3F4F6]"
        }`}
      >
        {isHomePage ? (
          <section className="flex flex-col justify-center items-center min-h-screen text-[#f0ebd8] text-center">
            <h1 className="text-5xl font-bold mb-4">환영합니다!</h1>
            <p className="text-lg mb-6 text-[#748cab]">
              최신 영화와 인기 콘텐츠를 만나보세요.
            </p>
            <button
              className="bg-[#B2DAB1] text-[#1E3A5F] px-6 py-3 rounded-md shadow-md hover:bg-[#A0C89C] transition-all duration-200 cursor-pointer"
              onClick={() => navigate("/movies/popular")}
            >
              지금 시작하기
            </button>
          </section>
        ) : (
          <Outlet />
        )}
      </div>
      {isHomePage && (
        <footer className="bg-[#1E3A5F] text-[#f0ebd8] py-6 text-center">
          <p>UMC 8th 문서정. Week 3, Mission 3.</p>
        </footer>
      )}
    </>
  );
};

export default HomePage;
