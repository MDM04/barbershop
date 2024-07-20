import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;


interface IBirthdayDatePickerProps {
  description: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const BirthdayDatePicker = ({
  description,
  selectedDate,
  onChange,
}: IBirthdayDatePickerProps) => {
  return (
    <Div>
      <Label htmlFor="birthdayDate">{description}</Label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()} // A data máxima é a data atual
        dropdownMode="select" // Modo de dropdown para selecionar o ano
        id="birthdayDate"
        className="form-control"
      />
    </Div>
  );
};

export default BirthdayDatePicker;
