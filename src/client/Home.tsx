import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 15px;
  }
`;

const Home = () => {
  return (
    <Div>
      <Header title="Contatos"/>
      <h1>Avuá Barbearia</h1>
      <Outlet/>
      <Footer name="MDM Pro"/>
    </Div>
  );
};

export default Home;
