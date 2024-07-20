import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const A = styled.a`
  position: relative;
  font-weight: 500;
  color: #030303;
  text-decoration: none;
  transition: color 0.3s ease, border-bottom-color 0.3s ease; /* Transição suave para a cor do texto e a cor da borda inferior */
  border-bottom: 2px solid transparent; /* Borda inferior transparente */

  &:hover {
    color: #022d6d; /* Mudança de cor ao passar o mouse */
    border-bottom: 2px solid #022d6d; /* Adicionar sublinhado ao passar o mouse */
  }
`;

interface IContactLinksProps {
  description: string;
  contactUrl: string;
}

const ContactLink = ({ description, contactUrl }: IContactLinksProps) => {
  return (
    <Container>
      <A href={contactUrl} target="_blank">
        {description}
      </A>
    </Container>
  );
};

export default ContactLink;
