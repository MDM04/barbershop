import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import { Link } from 'react-router-dom';

// Estilos
const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  min-height: 100vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.mobileM} {
    padding: 15px;
  }

  @media ${device.mobileL} {
    padding: 20px;
  }

  @media ${device.tablet} {
    padding: 25px;
  }
`;

const AdminTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #111111;

  @media ${device.mobileS} {
    font-size: 20px;
  }

  @media ${device.mobileM} {
    font-size: 22px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }

  @media ${device.tablet} {
    font-size: 26px;
  }
`;

// Estilos do botão
const Button = styled(Link)`
  margin: 100px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminWelcomePage = () => {
  return (
    <AdminContainer>
      <AdminTitle>Login Administrativo</AdminTitle>
      <Button to="/admin/admin-login">Clique-Aqui</Button>
    </AdminContainer>
  );
};

export default AdminWelcomePage;
