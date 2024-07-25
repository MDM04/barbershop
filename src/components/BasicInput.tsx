import styled from "styled-components";

const DivContainer = styled.div`
  margin: 0px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const P = styled.p`
    color: rgb(238, 40, 40);
    font-size: 14px;
`

interface IBasicInputProps {
  type: string;
  name: string;
  placeholder: string;
  register: any;
  messageError: any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const BasicInput = ({
  type,
  name,
  placeholder,
  register,
  messageError,
  onFocus,
}: IBasicInputProps) => {
  return (
    <DivContainer>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register}
        onFocus={onFocus}
      />
      {messageError && <P>{messageError}</P>}
    </DivContainer>
  );
};

export default BasicInput;
