import React, { useEffect, useState } from 'react';
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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    if (data.password !== data.confirmPassword) {
      setPasswordError('Senha e confirmação de senha não correspondem.');
      return;
    }
    
    // Limpar erro de senha se as senhas coincidem
    setPasswordError('');

    // Salvar no localStorage
    localStorage.setItem('userData', JSON.stringify(data));

    // Descomentar para enviar via axios
    
    try {
      await axios.post('http://localhost:5000/api/signup', data);
      setSuccessMessage('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
    

    setSuccessMessage('Cadastro realizado com sucesso!');
  };

  useEffect(() => {
    if (successMessage) {
      // Resetar o formulário após o sucesso
      reset({ firstName: '',
        lastName: '',
        phone: '',
        email: '',
        birthDate: '',
        username: '',
        password: '',
        confirmPassword: '' });
    }
  }, [successMessage, reset]);

  return (
    <Container>
      <MainTitle>Cadastre-se</MainTitle>
      <Forms>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        <InputWrapper>
          <Input
            type="text"
            placeholder="Nome"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && <p>Nome é obrigatório</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Sobrenome"
            {...register('lastName', { required: true })}
          />
          {errors.lastName && <p>Sobrenome é obrigatório</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="tel"
            placeholder="Telefone"
            {...register('phone', { required: true })}
          />
          {errors.phone && <p>Telefone é obrigatório</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <p>Email é obrigatório</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="date"
            placeholder="Data de Nascimento"
            {...register('birthDate', { required: true })}
          />
          {errors.birthDate && <p>Data de nascimento é obrigatória</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type="text"
            placeholder="Usuário"
            {...register('username', { required: true })}
          />
          {errors.username && <p>Usuário é obrigatório</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            {...register('password', { required: true })}
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          {errors.password && <p>Senha é obrigatória</p>}
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirme a Senha"
            {...register('confirmPassword', { required: true })}
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </TogglePassword>
          {errors.confirmPassword && <p>Confirmação de senha é obrigatória</p>}
          {passwordError && <ErrorText>{passwordError}</ErrorText>}
        </InputWrapper>

        <Button type="submit" onClick={handleSubmit(onSubmit)}>Cadastrar</Button>
        <LinkText to="/login">Já tem uma conta? Faça login</LinkText>
      </Forms>
    </Container>
  );
};

export default SignUpPage;
