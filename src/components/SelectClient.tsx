import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery'; // Corrigido para o caminho correto

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 40px;
  font-size: 14px;

  @media ${device.mobileS} {
    font-size: 12px;
    height: 38px;
  }

  @media ${device.mobileM} {
    font-size: 12px;
    height: 38px;
  }

  @media ${device.mobileL} {
    font-size: 13px;
    height: 40px;
  }

  @media ${device.tablet} {
    font-size: 14px;
    height: 40px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 4px;

  @media ${device.mobileS} {
    font-size: 12px;
  }

  @media ${device.mobileM} {
    font-size: 12px;
  }

  @media ${device.mobileL} {
    font-size: 13px;
  }

  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 12px;
  background-color: #f9f9f9;

  @media ${device.mobileS} {
    max-width: 90%;
  }

  @media ${device.mobileM} {
    max-width: 90%;
  }

  @media ${device.mobileL} {
    max-width: 80%;
  }

  @media ${device.tablet} {
    max-width: 300px;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  color: #333;
  margin: 4px 0;

  @media ${device.mobileS} {
    font-size: 12px;
  }

  @media ${device.mobileM} {
    font-size: 12px;
  }

  @media ${device.mobileL} {
    font-size: 13px;
  }

  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: rgb(221, 58, 58);
  margin-top: 8px;

  @media ${device.mobileS} {
    font-size: 10px;
  }

  @media ${device.mobileM} {
    font-size: 11px;
  }

  @media ${device.mobileL} {
    font-size: 12px;
  }

  @media ${device.tablet} {
    font-size: 12px;
  }
`;

// Interface
interface Barber {
  name: string;
}

const Client = () => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedBarbers = localStorage.getItem('barbers');
    if (storedBarbers) {
      setBarbers(JSON.parse(storedBarbers));
    }
  }, []);

  const handleSelectBarber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBarber(event.target.value);
    setError(''); // Limpa a mensagem de erro quando uma opção é selecionada
  };

  // Filtra a lista de barbeiros para mostrar apenas o selecionado
  const filteredBarbers = barbers.filter(barber => barber.name === selectedBarber);

  return (
    <Container>
      <h1>Painel do Cliente</h1>
      <Label htmlFor="barberSelect">Escolha um barbeiro:</Label>
      <Select id="barberSelect" value={selectedBarber} onChange={handleSelectBarber}>
        <option value="" disabled>
          Selecione um barbeiro
        </option>
        {barbers.map((barber, index) => (
          <option key={index} value={barber.name}>
            {barber.name}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {selectedBarber && (
        <ListContainer>
          <List>
            {filteredBarbers.map((barber, index) => (
              <ListItem key={index}>{barber.name}</ListItem>
            ))}
          </List>
        </ListContainer>
      )}
    </Container>
  );
};

export default Client;
