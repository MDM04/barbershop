import styled from "styled-components";

const Div = styled.div`
width: 300px;
display: flex;
justify-content: center;
flex-direction: column;
`


const Label = styled.label`
font-size: 14px;
margin-bottom: 4px;
`

const Input =styled.input`
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
`

interface IInputNameProps {
    id: string;
    placeholder: string;
    register: any;
    required: boolean;
    description: string;
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
          <Input type={type} id={id} placeholder={placeholder} {...register} />
        {messageError && <P>{messageError}</P>}
      </Div>
    );
  };
  
  export default FormInput;
  