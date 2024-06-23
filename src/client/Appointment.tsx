import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-size: 15px;
  }
`;

const Appointement = () => {
  return (
    <Div>
      <h1>Agendamento</h1>
    </Div>
  );
};

export default Appointement;
