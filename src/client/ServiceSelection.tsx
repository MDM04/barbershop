import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualizado para useNavigate
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  
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
  margin: 10px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  height: 40px;
  font-size: 14px;
  box-sizing: border-box;

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

const Button = styled.button`
  margin: 2px 5px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  @media ${device.mobileS} {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media ${device.mobileM} {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media ${device.mobileL} {
    padding: 11px 22px;
    font-size: 15px;
  }

  @media ${device.tablet} {
    padding: 12px 24px;
    font-size: 16px;
  }
`;

const ServiceDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #0a0a0a;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const DetailLine = styled.p`
  font-size: 14px;
  margin: 5px 0;

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

interface Barber {
  name: string;
}

const ServiceSelectionPage = () => {
  const [services, setServices] = useState<{ name: string; price: number }[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Atualizado para useNavigate

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    const storedBarbers = localStorage.getItem('barbers');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
    if (storedBarbers) {
      setBarbers(JSON.parse(storedBarbers));
    }
  }, []);

  const handleSelectService = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
    setError('');
  };

  const handleSelectBarber = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBarber(event.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedService || !selectedBarber) {
      setError('Você deve selecionar um serviço e um barbeiro.');
    } else {
      localStorage.setItem('selectedService', selectedService);
      localStorage.setItem('selectedBarber', selectedBarber);
      navigate('/payment-method'); // Atualizado para navigate
    }
  };

  const selectedServiceDetails = services.find(service => service.name === selectedService);
  const selectedBarberDetails = barbers.find(barber => barber.name === selectedBarber);

  return (
    <Container>
      <Title>Seleção de Serviços</Title>
      <Select value={selectedService} onChange={handleSelectService} placeholder-arial="Escolha um serviço">
        <option value="" disabled>Selecione um serviço</option>
        {services.map((service, index) => (
          <option key={index} value={service.name}>
            {service.name} - R${service.price.toFixed(2)}
          </option>
        ))}
      </Select>
      <Select value={selectedBarber} onChange={handleSelectBarber} placeholder-arial="Escolha um barbeiro">
        <option value="" disabled>Selecione um barbeiro</option>
        {barbers.map((barber, index) => (
          <option key={index} value={barber.name}>
            {barber.name}
          </option>
        ))}
      </Select>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleSubmit}>Confirmar</Button>
      <Button onClick={() => setShowDetails(prev => !prev)}>
        {showDetails ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
      </Button>
      {showDetails && selectedServiceDetails && selectedBarberDetails && (
        <ServiceDetails>
          <DetailLine><strong>Serviço:</strong> {selectedServiceDetails.name}</DetailLine>
          <DetailLine><strong>Preço:</strong> R${selectedServiceDetails.price.toFixed(2)}</DetailLine>
          <DetailLine><strong>Barbeiro:</strong> {selectedBarberDetails.name}</DetailLine>
        </ServiceDetails>
      )}
    </Container>
  );
};

export default ServiceSelectionPage;
