import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { device } from '../config/MediaQuery';

// Estilos para o contêiner principal
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

// Estilos para o título principal
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

// Estilos para o formulário
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

// Estilos para o ícone de alternar visibilidade da senha
const TogglePassword = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #007bff;
  cursor: pointer;
`;

// Estilos para o contêiner de links
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

// Estilos para o texto de erro
const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 5px 0;
`;

// Estilos para a mensagem de sucesso
const SuccessMessage = styled.div`
  color: green;
  font-size: 1rem;
  margin: 10px 0;
`;

// Estilos para o wrapper do input, necessário para posicionar o ícone de senha
const InputWrapper = styled.div`
  position: relative;
`;

// Estilos para o campo de entrada
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

// Interface para os dados do formulário
interface FormInputs {
  newPassword: string;
  confirmPassword: string;
}

// Componente funcional de ResetPasswordPage
const ResetPasswordPage: React.FC = () => {
  // Estados para controle de visibilidade das senhas e mensagens de erro/sucesso
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Inicializa o hook useForm para gerenciar o formulário
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    mode: 'onBlur' // Define o modo de validação para quando o campo perde o foco
  });

  // Obtém o token da URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Função chamada ao submeter o formulário
  const onSubmit: SubmitHandler<FormInputs> = data => {
    // Verifica se as senhas coincidem
    if (data.newPassword !== data.confirmPassword) {
      setPasswordError('Senha e confirmação de senha não correspondem.');
      return;
    }

    // Limpa o erro de senha se as senhas coincidirem
    setPasswordError('');

    // Verifica se o token está presente
    if (token) {
      // Atualiza a senha no localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.password = data.newPassword;
      localStorage.setItem('userData', JSON.stringify(userData));

      // Define a mensagem de sucesso e reseta o formulário
      setSuccessMessage('Senha atualizada com sucesso!');
      reset(); // Limpa o formulário após o sucesso
    } else {
      setPasswordError('Token inválido ou ausente.'); // Mensagem de erro se o token for inválido ou ausente
    }
  };

  return (
    <Container>
      <MainTitle>Recuperação de Senha</MainTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'} // Define o tipo do campo baseado no estado de visibilidade
            placeholder="Nova Senha"
            {...register('newPassword', { required: true })} // Registra o campo no useForm e define como obrigatório
          />
          <TogglePassword onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna o ícone baseado no estado de visibilidade */}
          </TogglePassword>
          {errors.newPassword && <ErrorText>Nova senha é obrigatória</ErrorText>} {/* Exibe erro se o campo for obrigatório e não preenchido */}
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showConfirmPassword ? 'text' : 'password'} // Define o tipo do campo baseado no estado de visibilidade
            placeholder="Confirme a Senha"
            {...register('confirmPassword', { required: true })} // Registra o campo no useForm e define como obrigatório
          />
          <TogglePassword onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Alterna o ícone baseado no estado de visibilidade */}
          </TogglePassword>
          {errors.confirmPassword && <ErrorText>Confirmação de senha é obrigatória</ErrorText>} {/* Exibe erro se o campo for obrigatório e não preenchido */}
          {passwordError && <ErrorText>{passwordError}</ErrorText>} {/* Exibe erro se as senhas não coincidirem */}
        </InputWrapper>

        <button type="submit">Atualizar Senha</button> {/* Botão para submeter o formulário */}
      </Form>
      <LinkContainer>
        <Link to="/login">Voltar para o Login</Link> {/* Link para a página de login */}
      </LinkContainer>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>} {/* Exibe mensagem de sucesso se houver */}
    </Container>
  );
};

export default ResetPasswordPage;
