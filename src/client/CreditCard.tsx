import styled from 'styled-components';
import { useState, FocusEvent } from 'react';
import { useForm } from 'react-hook-form';
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import BasicInput from '../components/BasicInput';
import { useHookFormMask } from 'use-mask-input';
import { device } from '../config/MediaQuery'; // Certifique-se de ajustar o caminho conforme necessário
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

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
  gap: 2rem;

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

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;

  @media ${device.mobileS} {
    font-size: 20px;
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.laptop} {
    font-size: 24px;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

// Componente funcional PaymentForm
const CreditCard = () => {
  const [focused, setFocused] = useState<Focused | undefined>(undefined);
  const navigate = useNavigate(); // Inicializa o useNavigate

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const watchFields = watch(['number', 'expiry', 'cvc', 'name']);
  const registerWithMask = useHookFormMask(register);

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setFocused(evt.target.name as Focused);
  };

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <Container>
      <Title>Cartão</Title>
      <Cards
        number={watchFields[0] || ''}
        expiry={watchFields[1] || ''}
        cvc={watchFields[2] || ''}
        name={watchFields[3] || ''}
        focused={focused}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <BasicInput
          type="text"
          name="number"
          placeholder="Número do cartão"
          register={registerWithMask('number', ['9999 9999 9999 9999'], {
            required: 'Campo obrigatório',
            validate: (value) =>
              value.replace(/[^\d]/g, '').length === 16 ||
              'O número do cartão deve ter exatamente 16 caracteres',
          })}
          onFocus={handleInputFocus}
          messageError={errors.number?.message}
        />

        <BasicInput
          type="text"
          name="expiry"
          placeholder="Data de Validade"
          register={registerWithMask('expiry', ['99/99'], {
            required: 'Campo obrigatório',
            validate: (value) =>
              value.replace(/[^\d]/g, '').length === 4 ||
              'A data de validade deve ter exatamente 4 caracteres',
          })}
          onFocus={handleInputFocus}
          messageError={errors.expiry?.message}
        />

        <BasicInput
          type="text"
          name="cvc"
          placeholder="CVC"
          register={registerWithMask('cvc', ['999'], {
            required: 'Campo obrigatório',
            validate: (value) =>
              value.replace(/[^\d]/g, '').length === 3 ||
              'O CVC deve ter exatamente 3 caracteres',
          })}
          onFocus={handleInputFocus}
          messageError={errors.cvc?.message}
        />

        <BasicInput
          type="text"
          name="name"
          placeholder="Nome no Cartão"
          register={register('name', { required: 'Campo obrigatório' })}
          onFocus={handleInputFocus}
          messageError={errors.name?.message}
        />

        <SubmitButton type="submit">Confirmar</SubmitButton>
        <BackButton type="button" onClick={handleBack}>Voltar</BackButton>
      </Form>
    </Container>
  );
};

export default CreditCard;
