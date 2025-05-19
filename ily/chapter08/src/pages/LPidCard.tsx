import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios";
import { LPDETAILLIST } from "../utils/types/lp";

const LPidCard = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { LPid } = useParams();
  const [data, setData] = useState<LPDETAILLIST | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get(`/v1/lps/${LPid}`);
      setData(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      alert("로그인 후 사용해주세요.");
      navigate("/");
    }
  }, [accessToken, navigate]);

  if (!data) return <div className="text-white text-center">로딩 중...</div>;

  const lp = data.data;

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen px-4 py-6 flex flex-col items-center">
      {/* 작성자 정보 */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={lp.author.avatar}
          alt="author avatar"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm text-gray-300">{lp.author.name}</span>
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-semibold mb-6">{lp.title}</h1>

      {/* 썸네일 디스크 이미지 */}
      <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 border-black mb-6">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 본문 설명 */}
      <p className="text-center text-gray-300 mb-6 whitespace-pre-wrap max-w-2xl">
        {lp.content}
      </p>

      {/* 태그 */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {lp.tags.length > 0 ? (
          lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-[#2e2e2e] text-sm text-gray-300 px-3 py-1 rounded-full"
            >
              #{tag.name}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No tags</span>
        )}
      </div>

      {/* 좋아요 수 */}
      <div className="flex justify-center items-center text-pink-400 text-xl gap-2 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
            4.42 3 7.5 3c1.74 0 3.41 0.81 
            4.5 2.09C13.09 3.81 14.76 3 
            16.5 3 19.58 3 22 5.42 22 8.5c0 
            3.78-3.4 6.86-8.55 11.54L12 
            21.35z"
          />
        </svg>
        <span>{lp.likes.length}</span>
      </div>

      {/* 뒤로 가기 */}
      <Link to="/" className="text-sm text-gray-400 underline hover:text-white">
        ← 이전으로
      </Link>
    </div>
  );
};

export default LPidCard;
