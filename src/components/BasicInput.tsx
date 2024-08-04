import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const ErrorText = styled.p`
  color: rgb(238, 40, 40);
  font-size: 14px;
`;

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
    <InputWrapper>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register}
        onFocus={onFocus}
      />
      {messageError && <ErrorText>{messageError}</ErrorText>}
    </InputWrapper>
  );
};

export default BasicInput;
