import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import Client from '../components/SelectClient';

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

const ClientPage = () => (
  <Container>
    <Title>Serviços e Barbeiros</Title>
    <Client/>
  </Container>
);

export default ClientPage;
