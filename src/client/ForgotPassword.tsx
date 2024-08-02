// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../config/MediaQuery'; // Supondo que você tenha um arquivo para device configurations

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  height: 100vh;
  box-sizing: border-box;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 15px;
  }

  @media ${device.laptop} {
    padding: 20px;
  }
`;

// Estilos do título principal
const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 50px;

  @media ${device.mobileS} {
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    font-size: 1.75rem;
  }

  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 30px;

  @media ${device.mobileS} {
    font-size: 1.25rem;
  }

  @media ${device.tablet} {
    font-size: 1.35rem;
  }

  @media ${device.laptop} {
    font-size: 1.55rem;
  }
`;

// Estilos do formulário
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Estilos para links adicionais
const LinkContainer = styled.div`
  margin-top: 15px;
  text-align: center;

  a {
    display: block;
    margin: 5px 0;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para recuperação de senha
    alert('Link de recuperação enviado para o seu email.');
  };

  return (
    <Container>
      <MainTitle>Avuá Barbearia</MainTitle>
      <SubTitle>Recuperação de Senha</SubTitle>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Link de Recuperação</button>
      </Form>
      <LinkContainer>
        <Link to="/login">Voltar para o Login</Link>
      </LinkContainer>
    </Container>
  );
};

export default ForgotPasswordPage;
