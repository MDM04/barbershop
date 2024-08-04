import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones
import { device } from '../config/MediaQuery'; // Supondo que você tenha um arquivo para device configurations

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 200%);
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
  margin-bottom: 70px;
  
  color:#007bff;

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
  font-size: 1.75rem;
  margin-bottom: 50px;

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
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD -10%, #FFD700 500%);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */

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

// Estilos para o ícone de alternar visibilidade da senha
const TogglePassword = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #007bff;
  cursor: pointer;
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 10px 0;
`;

const InputWrapper = styled.div`
  position: relative;
`;

// Componente funcional de LoginPage
const LoginPage = () => {
  const [name, setName] = useState(''); // Estado para armazenar o nome do usuário
  const [password, setPassword] = useState(''); // Estado para armazenar a senha
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

  // Simular dados armazenados no localStorage
  const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

  // Função chamada ao submeter o formulário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se o usuário e senha correspondem aos dados armazenados
    if (name === storedUser.username && password === storedUser.password) {
      setError('');
      // Redirecionar ou realizar outras ações após login bem-sucedido
      // Exemplo: redirecionar para a página inicial
      window.location.href = '/welcome';
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <Container>
      <MainTitle>Avuá Barbearia</MainTitle>
      <SubTitle>Login</SubTitle>
      <Form onSubmit={handleLogin}>
        {error && <ErrorText>{error}</ErrorText>}
        <input 
          type="text" 
          placeholder="Usuário" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <InputWrapper>
          <input 
            type={showPassword ? 'text' : 'password'} // Alterna o tipo do input com base no estado
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna o ícone baseado no estado */}
          </TogglePassword>
        </InputWrapper>
        <button type="submit">Entrar</button>
      </Form>
      <LinkContainer>
        <Link to="/register">Cadastre-se aqui</Link>
        <Link to="/forgot-password">Esqueci minha senha</Link>
      </LinkContainer>
    </Container>
  );
};

export default LoginPage;
