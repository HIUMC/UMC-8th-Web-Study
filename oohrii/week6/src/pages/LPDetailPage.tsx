import React from 'react';
import { useParams } from 'react-router-dom';

const dummy = {
  id: 21,
  title: 'Übermensch',
  artist: '오타나인',
  createdAt: '1일 전',
  imageUrl: 'https://i.imgur.com/your-image-url.jpg',
  description: '“Übermensch” is a German word that translates to “overman” or “superman”. It can refer to a philosophical concept or to an album by the South Korean singer G-Dragon.',
  tags: ['오타나인', '빅뱅', '권지용', '정형돈', '광희', 'ubermensch'],
  likes: 1,
};

const LPDetailPage = () => {
  const { LPid } = useParams();
  // 실제로는 LPid로 fetch
  const data = dummy;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', background: 'transparent', padding: '48px 0' }}>
      <div style={{ background: '#232628', borderRadius: '18px', padding: '48px 56px', minWidth: '600px', maxWidth: '700px', margin: '0 auto', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee' }} />
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#d2ffd2' }}>{data.artist}</span>
          </div>
          <span style={{ color: '#ccc', fontSize: '15px' }}>{data.createdAt}</span>
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '28px', marginBottom: '24px', color: '#fff' }}>{data.title}</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <img src={data.imageUrl} alt={data.title} style={{ width: '340px', height: '340px', borderRadius: '16px', boxShadow: '0 2px 16px rgba(0,0,0,0.3)' }} />
        </div>
        <div style={{ color: '#fff', fontSize: '17px', marginBottom: '32px', textAlign: 'center' }}>
          <span style={{ color: '#fff', fontStyle: 'italic' }}>{data.description}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '32px' }}>
          {data.tags.map(tag => (
            <span key={tag} style={{ background: '#31363a', color: '#b8e0ff', borderRadius: '16px', padding: '6px 18px', fontSize: '15px' }}># {tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>✏️</button>
          <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: '22px', cursor: 'pointer' }}>🗑️</button>
          <button style={{ background: 'none', border: 'none', color: '#ff4d9d', fontSize: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>♥ <span style={{ fontSize: '20px', color: '#fff', marginLeft: '4px' }}>{data.likes}</span></button>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage; 