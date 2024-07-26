import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;



interface IBirthdayDatePickerProps {
  placeholder: string
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

const BirthdayDatePicker = ({
  placeholder,
  selectedDate,
  onChange,
}: IBirthdayDatePickerProps) => {
  return (
    <Div>
      <DatePicker
      placeholderText={placeholder}
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
