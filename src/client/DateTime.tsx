import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  min-height: 100vh;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.mobileM} {
    padding: 15px;
  }

  @media ${device.mobileL} {
    padding: 20px;
  }

  @media ${device.tablet} {
    padding: 25px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  color: #111111;

  @media ${device.mobileS} {
    font-size: 20px;
  }

  @media ${device.mobileM} {
    font-size: 22px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }

  @media ${device.tablet} {
    font-size: 26px;
  }
`;

const DatePickerContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #201f1f;
  border-radius: 8px;
  background-color: #ffffff;

  @media ${device.mobileS} {
    padding: 15px;
  }

  @media ${device.mobileM} {
    padding: 18px;
  }

  @media ${device.mobileL} {
    padding: 20px;
  }

  @media ${device.tablet} {
    padding: 22px;
  }
`;

const DateInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 300px;
  font-size: 16px;

  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

interface DateTimePageProps {
  availableDays?: string[];
  timeInterval?: number;
}

const DateTimePage: React.FC<DateTimePageProps> = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableDays, setAvailableDays] = useState<string[]>(['2024-01-01', '2024-12-31']);
  const [timeInterval, setTimeInterval] = useState<number>(30);

  useEffect(() => {
    // Carregar configurações do localStorage
    const days = JSON.parse(localStorage.getItem('availableDays') || '[]');
    const interval = Number(localStorage.getItem('timeInterval')) || 30;

    setAvailableDays(days);
    setTimeInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Data: ${date}, Hora: ${time}`);
  };

  return (
    <Container>
      <Title>Escolha a Data e Hora</Title>
      <DatePickerContainer>
        <form onSubmit={handleSubmit}>
          <DateInput 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            min={availableDays[0]} 
            max={availableDays[availableDays.length - 1]} 
            required 
          />
          <DateInput 
            type="time" 
            value={time} 
            step={timeInterval * 60} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
          <SubmitButton type="submit">Confirmar</SubmitButton>
        </form>
      </DatePickerContainer>
    </Container>
  );
};

export default DateTimePage;
