import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Container>
      <Header>
        <Title>마이페이지</Title>
      </Header>
      <Content>
        <LogoutButton onClick={handleLogout}>
          로그아웃
        </LogoutButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  margin: 0;
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoutButton = styled.button`
  padding: 12px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  
  &:hover {
    background: #ff3333;
  }
`;

export default MyPage; 