import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useInfiniteQuery } from 'react-query';

interface Album {
  id: number;
  title: string;
  imageUrl: string;
  artist: string;
  createdAt?: string;
  likes?: number;
}

interface AlbumGridProps {
  sortOrder: 'old' | 'new';
  onSort: (order: 'old' | 'new') => void;
}

// 스켈레톤 UI 컴포넌트
const SkeletonCard = () => (
  <div className="skeleton-card" />
);

// 깜빡이는 애니메이션 스타일 추가
const style = document.createElement('style');
style.innerHTML = `
.skeleton-card {
  width: 100%;
  height: 180px;
  background: linear-gradient(90deg, #b0b4b8 25%, #d3d6d9 50%, #b0b4b8 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  animation: skeleton-blink 1.2s infinite linear;
}
@keyframes skeleton-blink {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;
document.head.appendChild(style);

// 더미 fetch 함수 (실제 API로 대체)
const fetchAlbums = async ({ pageParam = 0, order = 'old' }) => {
  // 실제로는 fetch(`/api/albums?cursor=${pageParam}&order=${order}`)
  await new Promise(res => setTimeout(res, 700)); // 로딩 효과
  const dummy = Array.from({ length: 5 }, (_, i) => ({
    id: pageParam * 5 + i + 1,
    title: `앨범 ${pageParam * 5 + i + 1}`,
    imageUrl: 'https://i.imgur.com/1.jpg',
    artist: 'Bill Evans',
    createdAt: '1일 전',
    likes: Math.floor(Math.random() * 10),
  }));
  const hasNext = pageParam < 3; // 4페이지까지만
  return { albums: dummy, nextCursor: hasNext ? pageParam + 1 : undefined };
};

const AlertModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.4)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#232628', color: '#fff', borderRadius: '24px', padding: '40px 36px', minWidth: '340px', boxShadow: '0 4px 24px rgba(0,0,0,0.2)', textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '22px', marginBottom: '16px' }}>localhost:5173 내용:</div>
        <div style={{ fontSize: '18px', marginBottom: '32px' }}>로그인이 필요한 서비스입니다. 로그인을 해주세요!</div>
        <button onClick={onClose} style={{ background: '#8ee0ef', color: '#232628', border: 'none', borderRadius: '16px', fontSize: '20px', padding: '8px 32px', cursor: 'pointer' }}>확인</button>
      </div>
    </div>
  );
};

const AlbumGrid: React.FC<AlbumGridProps> = ({ sortOrder, onSort }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const observerRef = useRef<HTMLDivElement | null>(null);

  // useInfiniteQuery
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    ['albums', sortOrder],
    ({ pageParam = 0 }) => fetchAlbums({ pageParam, order: sortOrder }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  // 무한 스크롤 IntersectionObserver
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;
    const observer = new window.IntersectionObserver(handleObserver, { threshold: 1 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [handleObserver]);

  const handleCardClick = (id: number) => {
    if (isAuthenticated) {
      navigate(`/lp/${id}`);
    } else {
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate('/login');
  };

  // 앨범 데이터 펼치기
  const albums = data?.pages.flatMap(page => page.albums) ?? [];

  return (
    <div style={{ width: '100%' }}>
      <AlertModal open={modalOpen} onClose={handleModalClose} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => onSort('old')} style={{ background: sortOrder === 'old' ? '#ff33cc' : '#222', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>오래된순</button>
        <button onClick={() => onSort('new')} style={{ background: sortOrder === 'new' ? '#ff33cc' : '#222', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', cursor: 'pointer' }}>최신순</button>
      </div>
      {(isLoading || albums.length === 0) ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
          {albums.map(album => (
            <div
              key={album.id}
              style={{
                background: '#222',
                borderRadius: '8px',
                overflow: 'hidden',
                textAlign: 'center',
                color: '#fff',
                position: 'relative',
                transition: 'transform 0.2s',
                transform: hoveredId === album.id ? 'scale(1.07)' : 'scale(1)',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredId(album.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(album.id)}
            >
              <img src={album.imageUrl} alt={album.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
              {hoveredId === album.id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  color: '#fff',
                  padding: '24px',
                  boxSizing: 'border-box',
                  transition: 'background 0.2s',
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>{album.title}</div>
                  <div style={{ fontSize: '15px', marginBottom: '16px', opacity: 0.85 }}>{album.createdAt || '1 days ago'}</div>
                  <div style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '18px' }}>♥</span> {album.likes ?? 0}
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* 무한 스크롤 트리거용 div */}
          <div ref={observerRef} style={{ height: '1px' }} />
          {isFetchingNextPage && Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skel-next-${i}`} />)}
        </div>
      )}
    </div>
  );
};

export default AlbumGrid; 