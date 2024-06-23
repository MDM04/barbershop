import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garantir que ocupe 100% da altura da viewport */
  background-color: rgb(243, 241, 108);
`;

const Main = styled.main`
  flex: 1; /* Faz o conteúdo ocupar o espaço restante entre header e footer */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centralizar verticalmente */
`;

const H1 = styled.h1`
  font-size: 20px;
  color: #d37223;
`;

const Home = () => {
  return (
    <Container>
      <Header title="Contatos" />
      <Main>
        <H1>Avuá Barbearia</H1>
        <Outlet />
      </Main>
      <Footer name="MDM Pro" />
    </Container>
  );
};

export default Home;
