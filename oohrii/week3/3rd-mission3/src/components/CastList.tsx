import { Cast } from "../types/movie";

interface CastListProps {
  cast: Cast[];
}

const CastList = ({ cast }: CastListProps) => {
  return (
    <div>
      <h2>출연진</h2>
      <ul>
        {cast.map((member) => (
          <li key={member.id}>
            {member.name} ({member.character})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastList;

