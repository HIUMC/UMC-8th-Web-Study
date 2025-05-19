import { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`lps/${lp.id}`)}
      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold text-center px-2">{lp.title}</h3>
      </div>
    </div>
  );
};

export default LpCard;