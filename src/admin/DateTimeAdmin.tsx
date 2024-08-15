import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

// Estilos
const AdminContainer = styled.div`
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

const AdminTitle = styled.h1`
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

const InputContainer = styled.div`
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

const Input = styled.input`
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

const AdminDateTime = () => {
  const [availableDays, setAvailableDays] = useState<string[]>(['2024-01-01', '2024-12-31']);
  const [timeInterval, setTimeInterval] = useState<number>(30);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setAvailableDays([...availableDays, value]);
    } else {
      setAvailableDays(availableDays.filter(day => day !== value));
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeInterval(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('availableDays', JSON.stringify(availableDays));
    localStorage.setItem('timeInterval', timeInterval.toString());
    console.log('Configurações salvas:', { availableDays, timeInterval });
  };

  return (
    <AdminContainer>
      <AdminTitle>Configurações de Disponibilidade</AdminTitle>
      <InputContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="checkbox"
                value="2024-01-01"
                onChange={handleDayChange}
                checked={availableDays.includes('2024-01-01')}
              />
              2024-01-01
            </label>
            <label>
              <input
                type="checkbox"
                value="2024-01-02"
                onChange={handleDayChange}
                checked={availableDays.includes('2024-01-02')}
              />
              2024-01-02
            </label>
            {/* Adicione mais dias conforme necessário */}
          </div>
          <Input
            type="number"
            min="5"
            max="60"
            value={timeInterval}
            onChange={handleIntervalChange}
            required
          />
          Intervalo de Tempo (minutos)
          <SubmitButton type="submit">Salvar Configurações</SubmitButton>
        </form>
      </InputContainer>
    </AdminContainer>
  );
};

export default AdminDateTime;
