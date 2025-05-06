import { Lp } from "../../types/lp"

interface LpCardProps {
    lp: Lp;
}

const LpCard = ({lp}:LpCardProps) => {
  return (
    <div
        className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
        <img
        src={lp.thumbnail}
        alt={lp.title}
        className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
            <h2 className="text-sm text-white font-semibold">{lp.title}</h2>
        </div>
    </div>
  )
}

export default LpCard
