import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const A = styled.a`
  position: relative;
  font-weight: 500;
  color: #030303;
  text-decoration: none;
  transition: color 0.5s ease; /* Transição suave para a cor do texto */

  &:hover {
    color: #022d6d; /* Mudança de cor ao passar o mouse */
  }

  /* Pseudo-elemento para o efeito "cometa" */
  &::after {
    content: "";
    position: absolute;
    bottom: -3px; /* Distância do "cometa" abaixo do texto */
    left: 0;
    width: 100%;
    height: 2px; /* Altura do "cometa" */
    background-color: rgb(0, 0, 0); /* Cor do "cometa" */
    transform: scaleX(0); /* Inicia sem largura */
    transform-origin: left; /* Origem da transformação */
    transition: transform 0.5s ease; /* Transição suave para a largura */
  }

  &:hover::after {
    transform: scaleX(1);
    height: 3px; /* Expandir o "cometa" ao passar o mouse */
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
