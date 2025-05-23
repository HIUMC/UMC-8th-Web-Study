import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img
        src={lp.imageUrl}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4">
        <h3 className="text-white text-lg font-semibold">{lp.title}</h3>
        <p className="text-gray-300 text-sm">{lp.artist}</p>
        <div className="flex gap-2 mt-2">
          {lp.tags.map((tag) => (
            <span key={tag} className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="mt-2 text-gray-300 text-sm">
          좋아요 {lp.likes}개
        </div>
      </div>
    </div>
  );
};

export default LpCard;