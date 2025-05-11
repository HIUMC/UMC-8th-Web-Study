import {Lp} from"../../types/lp.ts"

interface LpCardProps {
    lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div className='relative overflow-hidden shadow-lg transform transition duration-300 hover:scale-110 hover:cursor-pointer group'>
        <img src={lp.thumbnail} alt={lp.title} className='object-cover w-full h-full'/>
        
        {/* 아래에서 위로 갈수록 투명해지는 검정 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
          <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
          <p className="text-gray-300 text-xs mt-1">{lp.createdAt.slice(0, 10)}</p>
          <p className="text-gray-300 text-xs mt-1">♡ {lp.likes.length}</p>
        </div>
    </div>
  )
}

export default LpCard
