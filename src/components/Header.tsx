import styled from "styled-components";
import ContactLink from "./ContactLink";

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  padding: 30px;
  align-items: center;
  justify-content: space-around;
  background: #67a3e7;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #111111;
`;

const Contacts = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  gap: 40px;
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
