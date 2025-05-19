import { LP } from "../../utils/types/lp";
import { useEffect } from "react";
import { axiosInstance } from "../../apis/axios";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: LP;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate(`/lps/${lp.id}`);
        }}
        className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 group hover:scale-105 cursor-pointer"
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-48"
        />
        {/* Hover 시 나타나는 반투명 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center ">
          <p className="text-white text-lg font-semibold mb-2">{lp.title}</p>
          <p className="text-white text-sm">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <p className="text-white text-sm">
            {new Date(lp.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default LpCard;
