import styled from "styled-components";
import { device } from "../config/MediaQuery";
import Admin from "../components/SelecAdmin";
import AdminServicePage from "../components/AdminService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

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

const Title = styled.h1`
  margin-bottom: 20px;
`;

const AdminPage = () => (
  <Container>
    <Title>Serviços e Barbeiros</Title>

    <AdminServicePage />
    <Admin />
  </Container>
);

export default AdminPage;
