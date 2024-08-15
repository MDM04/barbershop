import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import { useNavigate } from 'react-router-dom'; // Importação para navegação
import AdminService from './AdminService';

// Estilo do Container com base no estilo do ForgotPasswordPage
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

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;

  @media ${device.mobileS} {
    font-size: 1.2rem;
  }
  @media ${device.mobileM} {
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    font-size: 1.75rem;
  }

  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;



// Componente funcional ServicesPage
const AdminServicesPage = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackToMenu = () => {
    navigate('/admin/admin-home'); // Ajuste o caminho conforme necessário
  };

  return (
    <Container>
      <MainTitle>Painel de Serviços</MainTitle>
      <AdminService/>
      <BackButton onClick={handleBackToMenu}>Voltar ao Painel</BackButton>
    </Container>
  );
};

export default AdminServicesPage;
