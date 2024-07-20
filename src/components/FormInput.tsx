import styled from 'styled-components';

// Estilos
const Div = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 12px;

  @media (max-width: 480px) {
    max-width: 90%;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 80%;
  }

  @media (min-width: 769px) {
    max-width: 300px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 13px;
  }

  @media (min-width: 769px) {
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 40px;

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 12px;
    height: 38px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
    height: 40px;
  }

  @media (min-width: 769px) {
    padding: 8px;
    font-size: 14px;
    height: 40px;
  }
`;

const P = styled.p`
  font-size: 12px;
  color: rgb(221, 58, 58);
  margin-top: 4px;

  @media (max-width: 480px) {
    font-size: 10px;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    font-size: 11px;
  }

  @media (min-width: 769px) {
    font-size: 12px;
  }
`;

// Interface
interface IInputNameProps {
  id: string;
  placeholder: string;
  register: any;
  required: boolean;
  description?: string;
  messageError?: any;
  type?: string;
}

const FormInput = ({
  id,
  placeholder,
  register,
  description,
  messageError,
  type = "text",
}: IInputNameProps) => {
  return (
    <Div>
      <Label htmlFor={id}>{description}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
      />
      {messageError && <P>{messageError}</P>}
    </Div>
  );
};

export default FormInput;
