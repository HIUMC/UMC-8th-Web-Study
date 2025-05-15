import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  return (
    <div
  onClick={() => navigate(`/lps/${lp.id}`)}
  className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow transition-transform duration-500 group cursor-pointer transform hover:scale-105"
>
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48 group-hover:brightness-50 transition-all duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <h3 className="text-white text-lg font-semibold">{lp.title}</h3>
        <p className="text-white text-sm mt-1">
          Created At: {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="text-white text-sm mt-1">Likes: {lp.likes.length}</p>
      </div>
    </div>
  );
};

export default LpCard;
