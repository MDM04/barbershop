import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { device } from '../config/MediaQuery';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD -10%, #FFD700 500%);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

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

const TogglePassword = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #007bff;
  cursor: pointer;
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

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 10px 0;
`;

const InputWrapper = styled.div`
  position: relative;
`;

interface FormInputs {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');

  const onSubmit: SubmitHandler<FormInputs> = data => {
    if (data.username === storedUser.username && data.password === storedUser.password) {
      window.location.href = '/welcome';
    } else {
      alert('Usuário ou senha inválidos.');
      reset({username:'', password: ''}); // Reseta o formulário em caso de erro
    }
  };

  return (
    <Container>
      <MainTitle>Avuá Barbearia</MainTitle>
      <SubTitle>Login</SubTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <input 
            type="text" 
            placeholder="Usuário" 
            {...register('username', { required: true })} 
          />
          {errors.username && <ErrorText>Usuário é obrigatório</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Senha" 
            {...register('password', { required: true })} 
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          {errors.password && <ErrorText>Senha é obrigatória</ErrorText>}
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
