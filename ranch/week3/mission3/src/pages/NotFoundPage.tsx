import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F3F4F6] text-[#1E3A5F]">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="bg-[#1E3A5F] text-[#B2DAB1] px-6 py-3 rounded-md shadow-md 
        hover:bg-[#164055] transition-all duration-200 text-sm"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
