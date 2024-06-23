import styled from "styled-components";

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #fff0cc;
  text-align: center;
  padding: 1rem 0;
  box-shadow: 0 -1px 5px rgba(113, 113, 113, 0.1);
`;

const Paragraph = styled.p`
  margin: 0;
  color: #828383;
`;

interface IFooterProps {
  name: string;
}

const Footer = ({ name }: IFooterProps) => {
  return (
    <FooterContainer>
      <Paragraph>
        &copy; {name}
      </Paragraph>
    </FooterContainer>
  );
};

export default Footer;
