import {  Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { device } from "../config/MediaQuery";
import { useState } from "react";
import AdminPage from "../admin/ServicesAdmin";
import FormWithTable from "./FormClient";


// Estilos do Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Garantir que ocupe 100% da altura da viewport */
  background-color: rgb(243, 241, 108);
  overflow: hidden; /* Evitar o scroll indesejado */

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 20px;
  }

  @media ${device.laptop} {
    padding: 30px;
  }
`;

// Estilos do Título
const Title = styled.h1`
  font-size: 40px;
  color: #d37223;
  text-align: center; /* Centraliza o título horizontalmente */
  margin: 30px 0; /* Espaçamento acima e abaixo do título */
  margin-top: 100px;
  font-family: 'Patrick Hand', cursive; /* Fonte manuscrita */


  @media ${device.mobileS} {
    font-size: 16px;
  }

  @media ${device.mobileM} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.laptop} {
    font-size: 24px;
  }

  @media ${device.desktop} {
    font-size: 28px;
  }
`;

const StyledLink = styled(Link)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
  margin: 20px 0;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

// Estilos do Main
const Main = styled.main`
  flex: 1; /* Faz o conteúdo ocupar o espaço restante entre header e footer */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza verticalmente */

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 20px;
  }

  @media ${device.laptop} {
    padding: 30px;
  }
`;

// Componente Home
const Home = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleButtonClick = () => {
    setIsButtonVisible(false);
  };

  return (
    <Container>
      <Header title="Contatos" />
      <Title>Avuá Barbearia</Title>
      <AdminPage/>
      <FormWithTable/>
      <Main>
        {isButtonVisible ? (
          <StyledLink to={'/appointment'} onClick={handleButtonClick}>Clique Aqui ...</StyledLink>
        ) : (
          <Outlet />
        )}
      </Main>
      <Footer name="MDM Pro" />
    </Container>
  );
};

export default Home;
