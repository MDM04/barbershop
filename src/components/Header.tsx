import styled from "styled-components";
import ContactLink from "./ContactLink";
import { device } from "../config/MediaQuery";

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  padding: 20px; /* Ajuste do padding para economizar espaço */
  align-items: center;
  justify-content: space-around; /* Espaçar melhor os itens */
  background: #007bff;
  flex-wrap: wrap; /* Permitir quebra de linha em telas menores */

  @media ${device.mobileS} {
    padding: 15px;
    flex-direction: column; /* Organizar verticalmente em telas menores */
    align-items: center; /* Centralizar itens em telas menores */
    text-align: center; /* Centralizar texto */
  }

  @media ${device.tablet} {
    padding: 20px;
  }

  @media ${device.laptop} {
    padding: 20px;
    flex-direction: row; /* Voltar para a organização horizontal */
    align-items: center; /* Centralizar itens novamente */
    justify-content: space-between; /* Espaçar itens uniformemente */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #111111;

  @media ${device.mobileS} {
    font-size: 20px;
    margin-bottom: 10px; /* Espaçamento inferior para separação */
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.laptop} {
    font-size: 24px;
  }
`;

const Contacts = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 30px; /* Reduzido o espaçamento entre os links */

  @media ${device.mobileS} {
    flex-direction: column; /* Organizar verticalmente em telas menores */
    align-items: center; /* Centralizar itens em telas menores */
    gap: 10px; /* Reduzir espaço entre os links */
  }

  @media ${device.mobileM} {
    gap: 15px; /* Ajuste progressivo do espaço entre os links */
  }

  @media ${device.mobileL} {
    gap: 20px; /* Ajuste progressivo do espaço entre os links */
  }

  @media ${device.tablet} {
    flex-direction: row; /* Organizar horizontalmente em telas maiores */
    align-items: center; /* Centralizar itens novamente */
    gap: 20px; /* Ajuste progressivo do espaço entre os links */
  }

  @media ${device.laptop} {
    gap: 30px; /* Espaçamento ajustado */
  }
`;

interface IHeaderProps {
  title: string;
}

const Header = ({ title }: IHeaderProps) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <Contacts>
        <ContactLink
          description="Instagram"
          contactUrl="https://www.instagram.com"
        />
        <ContactLink
          description="Facebook"
          contactUrl="https://www.facebook.com"
        />
        <ContactLink
          description="WhatsApp"
          contactUrl="https://web.whatsapp.com/5511965481644"
        />
      </Contacts>
    </HeaderContainer>
  );
};

export default Header;
