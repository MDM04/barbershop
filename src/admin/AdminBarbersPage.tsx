import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Importação para navegação
import { device } from "../config/MediaQuery";
import SelectBarbers from "./SelectBarbers";

// Estilo do Container com base no estilo utilizado anteriormente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #ffd700 0%, #fffacd 50%, #ffd700 100%);
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
  color: #141414;

  @media ${device.mobileS} {
    font-size: 1.2rem;
  }
  @media ${device.mobileM} {
    font-size: 1rem;
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

// Componente funcional BarbersPanelPage
const AdminBarbersPage = () => {
  const navigate = useNavigate(); // Hook para navegação

  // Função para voltar ao menu
  const handleBackToMenu = () => {
    navigate('/admin/admin-home'); // Ajuste o caminho conforme necessário
  };

  return (
    <Container>
      <MainTitle>Painel de Barbeiros</MainTitle>
      <SelectBarbers />
      <BackButton onClick={handleBackToMenu}>Voltar ao Painel</BackButton>
    </Container>
  );
};

export default AdminBarbersPage;
