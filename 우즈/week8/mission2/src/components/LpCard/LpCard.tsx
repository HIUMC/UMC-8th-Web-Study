import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`lps/${lp.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className={`object-cover w-full h-48 transition duration-300 ${
          isHovered ? "blur-sm brightness-75" : ""
        }`}
      />

      {/* 항상 보이는 제목 (하단 검은 바) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold truncate">
          {lp.title}
        </h3>
      </div>

      {/* 마우스 hover 시 태그 보여주기 (배경 위에 바로 표시) */}
      {isHovered && lp.tags && lp.tags.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {lp.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-white/80 text-black text-sm px-3 py-1 rounded-full shadow"
              >
                #{typeof tag === "string" ? tag : tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LpCard;
