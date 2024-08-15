// src/pages/ForgotPasswordPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { device } from '../config/MediaQuery';

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

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;

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

// Componente funcional ForgotPasswordPage
const AdminForgotPassword= () => {
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail digitado
  const [message, setMessage] = useState(''); // Estado para armazenar mensagens de erro ou sucesso
  const navigate = useNavigate(); // Hook para navegação

  // Função chamada ao submeter o formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    
    // Verifica se o e-mail está presente no localStorage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (userData.email === email) {
      // Redireciona para a página de redefinição de senha com um token fictício
      navigate(`/reset-password?token=mock-token`);
    } else {
      setMessage('Email não encontrado.'); // Exibe mensagem de erro se o e-mail não for encontrado
    }
  };
     return (
    <Container>
      <MainTitle>Recuperação de Senha</MainTitle>
      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do e-mail
          required
        />
        <button type="submit">Enviar Link de Recuperação</button>
      </Form>
      <LinkContainer>
        <Link to="/admin/admin-login">Voltar para o Login</Link> {/* Link para voltar à página de login */}
      </LinkContainer>
      {message && <p>{message}</p>} {/* Exibe a mensagem de erro ou sucesso, se houver */}
    </Container>
  );
};

export default AdminForgotPassword;
