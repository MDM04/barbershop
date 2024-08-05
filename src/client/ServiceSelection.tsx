import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Title = styled.h2`
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

// Interface
interface Barber {
  name: string;
}

interface Service {
  name: string;
  price: number;
  priceMonthly?: number;
  priceQuarterly?: number;
  priceSemiannually?: number;
  priceAnnually?: number;
}

const ServiceSelectionPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedServiceType, setSelectedServiceType] = useState<string>('');
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

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

  const handleSelectServiceType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceType(event.target.value);
    setSelectedService('');
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
      navigate('/payment-method');
    }
  };

  const getServicePrice = (service: Service) => {
    switch (selectedServiceType) {
      case 'daily':
        return service.price.toFixed(2);
      case 'monthly':
        return service.priceMonthly ? service.priceMonthly.toFixed(2) : 'N/A';
      case 'quarterly':
        return service.priceQuarterly ? service.priceQuarterly.toFixed(2) : 'N/A';
      case 'semiannually':
        return service.priceSemiannually ? service.priceSemiannually.toFixed(2) : 'N/A';
      case 'annually':
        return service.priceAnnually ? service.priceAnnually.toFixed(2) : 'N/A';
      default:
        return 'N/A';
    }
  };

  const convertServiceType = (type: string) => {
    switch (type) {
      case 'daily':
        return 'Diário';
      case 'monthly':
        return 'Mensal';
      case 'quarterly':
        return 'Trimestral';
      case 'semiannually':
        return 'Semestral';
      case 'annually':
        return 'Anual';
      default:
        return 'Desconhecido';
    }
  };

  const selectedServiceDetails = services.find(service => service.name === selectedService);
  const selectedBarberDetails = barbers.find(barber => barber.name === selectedBarber);

  return (
    <Container>
      <Title>Seleção de Serviços</Title>
      <Select value={selectedServiceType} onChange={handleSelectServiceType}>
        <option value="" disabled>Escolha um plano</option>
        <option value="daily">Diário</option>
        <option value="monthly">Mensal</option>
        <option value="quarterly">Trimestral</option>
        <option value="semiannually">Semestral</option>
        <option value="annually">Anual</option>
      </Select>
      <Select value={selectedService} onChange={handleSelectService}>
        <option value="" disabled>Selecione um serviço</option>
        {services.map((service, index) => (
          <option key={index} value={service.name}>
            {service.name} - R${getServicePrice(service)}
          </option>
        ))}
      </Select>
      <Select value={selectedBarber} onChange={handleSelectBarber}>
        <option value="" disabled>Barbeiro</option>
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
          <DetailLine><strong>Preço:</strong> R${getServicePrice(selectedServiceDetails)}</DetailLine>
          <DetailLine><strong>Plano escolhido:</strong> {convertServiceType(selectedServiceType)}</DetailLine>
          <DetailLine><strong>Barbeiro:</strong> {selectedBarberDetails.name}</DetailLine>
        </ServiceDetails>
      )}
    </Container>
  );
};

export default ServiceSelectionPage;
