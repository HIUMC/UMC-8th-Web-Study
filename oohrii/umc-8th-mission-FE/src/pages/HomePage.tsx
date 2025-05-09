import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AlbumGrid from '../components/AlbumGrid';
import { useQuery } from 'react-query';

// 임시 데이터 fetch 함수 (실제 API로 대체 가능)
const fetchAlbums = async (order: 'old' | 'new') => {
  // 실제로는 fetch(`/api/albums?order=${order}`) 등으로 대체
  const dummy = [
    { id: 1, title: 'Bill Evans', imageUrl: 'https://i.imgur.com/1.jpg', artist: 'Bill Evans' },
    { id: 2, title: 'The Weeknd', imageUrl: 'https://i.imgur.com/2.jpg', artist: 'The Weeknd' },
    { id: 3, title: 'Ed Sheeran', imageUrl: 'https://i.imgur.com/3.jpg', artist: 'Ed Sheeran' },
    // ...더미 데이터 추가
  ];
  return order === 'old' ? dummy : [...dummy].reverse();
};

const HomePage = () => {
  const [sortOrder, setSortOrder] = useState<'old' | 'new'>('old');
  const { data: albums = [], isLoading, refetch } = useQuery(['albums', sortOrder], () => fetchAlbums(sortOrder));

  // 사이드바 오픈 상태 및 반응형 처리
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [menuOpen, setMenuOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setSidebarOpen(true);
        setMenuOpen(true);
      } else {
        setSidebarOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSort = (order: 'old' | 'new') => {
    setSortOrder(order);
    refetch();
  };

  return (
    <div style={{ background: '#181818', minHeight: '100vh' }}>
      <Header onBurgerClick={() => setSidebarOpen(true)} />
      <div style={{ display: 'flex' }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
        <main style={{ flex: 1, padding: '32px' }}>
          <AlbumGrid sortOrder={sortOrder} onSort={handleSort} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
