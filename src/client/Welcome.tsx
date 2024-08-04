// src/pages/WelcomePage.tsx
import styled from 'styled-components';
import { device } from '../config/MediaQuery'; // Supondo que você tenha um arquivo para device configurations
import ServiceSelectionPage from './ServiceSelection';

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  height: 100vh;
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

// Estilos do título principal
const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;

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

// Estilos do container do usuário
const UserGreeting = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  color: #27292b;


  @media ${device.mobileS} {
    font-size: 0.875rem;
  }

  @media ${device.tablet} {
    font-size: 0.9rem;
  }

  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const WelcomePage = () => {
  // Obtém o nome do usuário do localStorage
  const userName = JSON.parse(localStorage.getItem('userData') || '{}').username;

  return (
    <Container>
      <UserGreeting>Olá,  {userName}</UserGreeting>
      <MainTitle>Bem-vindo</MainTitle>
      <ServiceSelectionPage/>
    </Container>
  );
};

export default WelcomePage;
