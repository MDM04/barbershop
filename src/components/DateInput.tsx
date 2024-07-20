import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;

const StyledDatePicker = styled.div`
  .react-datepicker__input-container {
    width: 180%;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    outline: none;

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
      border-color: #007bff;
    }
  }
`;

interface IDateProps {
  description: string;
  register: any; // Adicionando o tipo correto
}

const Datepicker = forwardRef<HTMLInputElement, IDateProps>(({ description, register }: IDateProps, ref) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleChange = (date: Date | null): void => {
    setSelectedDate(date);
  };

  const generateTimes = () => {
    const times = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0);

    const endTime = new Date();
    endTime.setHours(20, 0, 0, 0);

    for (let time = startTime; time < endTime; time.setMinutes(time.getMinutes() + 45)) {
      times.push(new Date(time));
    }

    return times;
  };

  const validTimes = generateTimes();

  return (
    <Container>
      <Label htmlFor="datetime">{description}</Label>
      <StyledDatePicker>
        <DatePicker
          selected={selectedDate}
          onChange={handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={45}
          dateFormat="dd/MM/yyyy HH:mm"
          timeCaption="Horário"
          includeTimes={validTimes}
          id="datetime"
          ref={ref} // Passa a ref para o DatePicker
          {...register} // Garante que o register está passando corretamente
        />
      </StyledDatePicker>
    </Container>
  );
});

Datepicker.displayName = 'Datepicker'; // Definindo o displayName para ajudar na depuração

export default Datepicker;
