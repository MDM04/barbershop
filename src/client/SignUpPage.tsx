import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { device } from '../config/MediaQuery';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa ícones para mostrar/ocultar senha
import axios from 'axios';

// Estilos do formulário
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

const Forms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 15px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ isPassword?: boolean }>`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    border-color: #007bff;
    outline: none;
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

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkText = styled(Link)`
  color: #007bff;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 5px 0;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 1rem;
  margin: 10px 0;
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

interface FormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setPasswordError('Senha e confirmação de senha não correspondem.');
      return;
    }
    
    // Limpar erro de senha se as senhas coincidem
    setPasswordError('');

    try {
      console.log(data)
      const response = await axios.post('http://localhost:1300/api/clients/signup', data);
      if (response.status === 201) {
        setSuccessMessage('Cadastro realizado com sucesso!');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Cadastro realizado, mas com alguns problemas.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setSuccessMessage('');
      setErrorMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  useEffect(() => {
    if (successMessage) {
      // Resetar o formulário após o sucesso
      reset({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        birthDate: '',
        username: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [successMessage, reset]);

  return (
    <Container>
      <MainTitle>Cadastre-se</MainTitle>
      <Forms>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        
        <InputWrapper>
          <Input
            type="text"
            placeholder="Nome"
            {...register('firstName', { required: 'Nome é obrigatório' })}
          />
          {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Sobrenome"
            {...register('lastName', { required: 'Sobrenome é obrigatório' })}
          />
          {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="tel"
            placeholder="Telefone"
            {...register('phone', { required: 'Telefone é obrigatório' })}
          />
          {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email é obrigatório' })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="date"
            placeholder="Data de Nascimento"
            {...register('birthDate', { required: 'Data de nascimento é obrigatória' })}
          />
          {errors.birthDate && <ErrorText>{errors.birthDate.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Usuário"
            {...register('username', { required: 'Usuário é obrigatório' })}
          />
          {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password', { required: 'Senha é obrigatória' })}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme a Senha"
            {...register('confirmPassword', { required: 'Confirmação de senha é obrigatória' })}
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </InputWrapper>

        <Button type="button" onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
        <LinkText to="/login">Já tem uma conta? Faça login</LinkText>
      </Forms>
    </Container>
  );
};

export default SignUpPage;
