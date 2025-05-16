import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LP } from '../types/lp';
import { useAuth } from '../contexts/AuthContext';

interface LPCardProps {
  lp: LP;
}

export const LPCard = ({ lp }: LPCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/lp/${lp.id}`);
    } else {
      if (window.confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')) {
        navigate('/signin');
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 bg-gray-800"
      style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="aspect-video bg-gray-700 flex items-center justify-center overflow-hidden">
        {(lp.thumbnail || lp.imageUrl) ? (
          <img 
            src={lp.thumbnail || lp.imageUrl} 
            alt={lp.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.removeAttribute('style');
            }} 
          />
        ) : (
          <span className="text-xl font-bold">{lp.title.charAt(0)}</span>
        )}
        <span 
          className="text-xl font-bold absolute" 
          style={{ display: 'none' }}
        >
          {lp.title.charAt(0)}
        </span>
      </div>
      
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 transition-opacity duration-300">
          <h3 className="text-lg font-semibold mb-2">{lp.title}</h3>
          <p className="text-sm text-gray-300 mb-1">
            {formatDate(lp.createdAt)}
          </p>
          <p className="text-sm text-gray-300">
            좋아요 {lp.likes.length}개
          </p>
        </div>
      )}
      
      {!isHovered && (
        <div className="p-4">
          <h3 className="font-semibold truncate">{lp.title}</h3>
          <p className="text-sm text-gray-400 mt-1">
            {lp.user?.nickname || lp.author?.nickname || lp.author?.name || '알 수 없음'}
          </p>
        </div>
      )}
    </div>
  );
};
