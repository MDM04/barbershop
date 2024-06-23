import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Div = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled(DatePicker)`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
`;

const P = styled.p`
  font-size: 12px;
  color: rgb(221, 58, 58);
  margin-top: 4px;
`;

interface IFormDateInputProps {
  register: any;
  id: string;
  placeholder: string;
  name: string;
  required: boolean;
  description: string;
  messageError?: any;
  onChange?: (date: Date | null) => void;
}

const DateInput = ({
  id,
  placeholder,
  description,
  messageError,
  required,
  register,
  name,
  onChange
}: IFormDateInputProps) => {
  return (
    <Div>
      <Label htmlFor={id}>{description}</Label>
      <Input
        id={id}
        {...register}
        placeholderText={placeholder}
        required={required}
        dateFormat={"dd/MM/yyyy"}
        name={name}
        selected={null}
        onChange={onChange}
      />
      {messageError && <P>{messageError}</P>}
    </Div>
  );
};

export default DateInput;
