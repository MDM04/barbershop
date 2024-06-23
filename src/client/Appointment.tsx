import { useForm } from "react-hook-form";
import { useHookFormMask } from "use-mask-input";
import FormInput from "../components/FormInput";

import styled from "styled-components";
//import DateInput from "../components/DateInput";

const Container = styled.div`
  max-width: 600px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto; /* Centralizar na tela */
  h1 {
    font-size: 15px;
  }
`;
const Button = styled.button`
  background-color: #007bff; /* Cor de fundo azul */
  color: white; /* Cor do texto branco */
  border: none; /* Sem borda */
  border-radius: 5px; /* Bordas arredondadas */
  padding: 10px 20px; /* Espaçamento interno */
  font-size: 16px; /* Tamanho da fonte */
  cursor: pointer; /* Cursor de ponteiro ao passar o mouse */
  transition: background-color 0.3s ease; /* Transição suave para a cor de fundo */

  &:hover {
    background-color: #0056b3; /* Cor de fundo ao passar o mouse */
  }

  &:active {
    background-color: #004085; /* Cor de fundo ao clicar */
  }

  &:focus {
    outline: none; /* Remover o contorno ao focar */
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Sombra ao focar */
  }
`;

const Appointement = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    //setValue
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  /*
   const handleChangeDateOfBirth = (date: Date | null) => {
    // Atualiza o valor do campo dateOfBirth no react-hook-form
    setValue('dateOfBirth', date);
  };
  */

  const registerWithMask = useHookFormMask(register);
  return (
    <Container>
      <h1>Agendamento</h1>
      <FormInput
        description="Nome : "
        placeholder="Digite seu nome..."
        id="name"
        register={register("name", { required: "Campo obrigatório ! " })}
        required={true}
        messageError={errors.name?.message}
      />
      <FormInput
        description="Telefone:"
        id="phone"
        placeholder="Digite seu telefone"
        register={registerWithMask("phone", ["(99) 9 9999-9999"], {
          required: "Campo obrigatório",
          validate: (value: string) =>
            value.replace(/[^\d]/g, "").length === 11 ||
            "O telefone deve ter exatamente 11 caracteres",
        })}
        required={true}
        messageError={errors.phone?.message}
      />
      {/*
          <DateInput
        description="Data de aniversário"
        id="dateOfBirth"
        name="dateOfBirth"
        placeholder="Data de aniversário : "
        register={register("dateOfBirth", { required: "Campo obrigatório" })}
        required={true}
        messageError={errors.dateOfBirth?.message}
        onChange={handleChangeDateOfBirth}
      />
      */}

      <div>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Confirmar
        </Button>
      </div>
    </Container>
  );
};

export default Appointement;
