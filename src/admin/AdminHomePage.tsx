import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../config/MediaQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  box-sizing: border-box;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 15px;
  }

  @media ${device.laptop} {
    padding: 20px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  color: #141414;
  text-align: center;

  @media ${device.mobileS} {
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    font-size: 1.75rem;
  }

  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const NavButton = styled(Link)`
  padding: 12px 24px;
  background-color: #333;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  max-width: 200px;
  display: block;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #555;
    transform: scale(1.05);
  }

  @media ${device.mobileS} {
    font-size: 0.9rem;
    padding: 10px 20px;
  }

  @media ${device.tablet} {
    font-size: 1rem;
    padding: 12px 24px;
  }

  @media ${device.laptop} {
    font-size: 1rem;
    padding: 14px 28px;
  }
`;

const AdminHomePage = () => {
  return (
    <Container>
      <MainTitle>Painel de Controle</MainTitle>
      <Navbar>
        <NavButton to="/admin/admin-scheduling">Agendamento</NavButton>
        <NavButton to="/admin/admin-barbers">Barbeiros</NavButton>
        <NavButton to="/admin/admin-services">Serviços</NavButton>
        <NavButton to="/admin/admin-birthday">Aniversários</NavButton>
        <NavButton to="/admin/admin-image">Imagens</NavButton>
      </Navbar>
    </Container>
  );
};

export default AdminHomePage;
