import styled from "styled-components";
import { useState, FocusEvent } from "react";
import { useForm } from "react-hook-form";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import BasicInput from "./BasicInput";
import { useHookFormMask } from "use-mask-input";

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const H1 = styled.h1`
  font-size: 15px;
  color: #f0f8ff;
`;

const PaymentForm = () => {
  const [focused, setFocused] = useState<Focused | undefined>(undefined);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const watchFields = watch(["number", "expiry", "cvc", "name"]);
  const registerWithMask = useHookFormMask(register);

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setFocused(evt.target.name as Focused);
  };

  return (
    <DivContainer>
      <H1>Forma de pagamento</H1>
      <Cards
        number={watchFields[0] || ""}
        expiry={watchFields[1] || ""}
        cvc={watchFields[2] || ""}
        name={watchFields[3] || ""}
        focused={focused}
      />
      <BasicInput
        type="text"
        name="number"
        placeholder="Numero do cartão"
        register={registerWithMask("number", ["9999 9999 9999 9999"], {
          required: "Campo obrigatório",
          validate: (value) =>
            value.replace(/[^\d]/g, "").length === 16 ||
            "O número do cartão deve ter exatamente 16 caracteres",
        })}
        onFocus={handleInputFocus}
        messageError={errors.number?.message}
      />

      <BasicInput
        type="text"
        name="expiry"
        placeholder="Data de Validade"
        register={registerWithMask("expiry", ["99/99"], {
          required: "Campo obrigatório",
          validate: (value) =>
            value.replace(/[^\d]/g, "").length === 4 ||
            "A data de validade deve ter exatamente 4 caracteres",
        })}
        onFocus={handleInputFocus}
        messageError={errors.expiry?.message}
      />

      <BasicInput
        type="text"
        name="cvc"
        placeholder="CVC"
        register={registerWithMask("cvc", ["999"], {
          required: "Campo obrigatório",
          validate: (value) =>
            value.replace(/[^\d]/g, "").length === 3 ||
            "O CVC deve ter exatamente 3 caracteres",
        })}
        onFocus={handleInputFocus}
        messageError={errors.cvc?.message}
      />

      <BasicInput
        type="text"
        name="name"
        placeholder="Nome no Cartão"
        register={register("name", { required: "Campo obrigatório" })}
        onFocus={handleInputFocus}
        messageError={errors.name?.message}
      />
      <button type="submit" onClick={handleSubmit(onSubmit)}>
        Confirmar
      </button>
    </DivContainer>
  );
};

export default PaymentForm;
