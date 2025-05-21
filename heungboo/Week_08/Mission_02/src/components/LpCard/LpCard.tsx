import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";

const LpCard = ({ lp }: { lp: Lp }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`lps/${lp.id}`)}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110 cursor-pointer"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 flex justify-between items-end p-4 transition-opacity opacity-0 hover:opacity-60 bg-black bg-opacity-50 ">
        <div className="text-white">
          <h3 className=" text-sm font-semibold">{lp.title}</h3>
          <p className="text-sm mb-1 ">
            {new Date(lp.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-white">
          <p className="text-sm">♥ {lp.likes.length} </p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
