import { Lp } from '../../types/lp';
import { useNavigate } from 'react-router-dom';

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  const lpClickHandler = (lpId: number) => {
    navigate(`/lp/${lpId}`);
  };

  return (
    <div
      key={lp.id}
      className="relative aspect-square overflow-hidden rounded-lg group hover:scale-105 transition-transform duration-300"
    >
      <img
        src={lp.thumbnail ?? '/images/Lp.svg'}
        alt={lp.title}
        className="w-full h-full object-cover cursor-pointer"
        onClick={() => lpClickHandler(lp.id)}
      />

      {/* 오버레이: group-hover로 보여지게 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

      {/* 텍스트: group-hover로 보여지게 + z-index 더 높게 */}
      <div className="absolute bottom-0 left-0 right-0 z-10 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-base font-semibold">{lp.title}</h3>
        <div className="flex justify-between items-center text-sm mt-1">
          <span>{formatDate(String(lp.createdAt))}</span>
          <span>♥️ {lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
