import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9; /* Fundo da página */
  
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
`;

const Select = styled.select`
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ServiceDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white; /* Fundo da seção de detalhes do serviço */
`;

const ClientPage = () => {
  const [services, setServices] = useState<{ name: string; price: number }[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleSelectService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedService) {
      setError('Você deve selecionar um serviço.');
    } else {
      setError('');
    }
  };

  const selectedServiceDetails = services.find(service => service.name === selectedService);

  return (
    <Container>
      <Title>Serviços Disponíveis</Title>
      <div>
        <label htmlFor="serviceSelect">Escolha um serviço:</label>
        <Select
          id="serviceSelect"
          value={selectedService}
          onChange={handleSelectService}
        >
          <option value="" disabled>Selecione um serviço</option>
          {services.map((service, index) => (
            <option key={index} value={service.name}>
              {service.name} - R${service.price.toFixed(2)}
            </option>
          ))}
        </Select>
        <Button onClick={handleSubmit}>Confirmar</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {selectedService && selectedServiceDetails && (
        <ServiceDetails>
          <h2>Serviço Selecionado</h2>
          <p><strong>Serviço:</strong> {selectedServiceDetails.name}</p>
          <p><strong>Preço:</strong> R${selectedServiceDetails.price.toFixed(2)}</p>
        </ServiceDetails>
      )}
    </Container>
  );
};

export default ClientPage;
