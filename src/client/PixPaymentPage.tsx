import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import { useNavigate } from 'react-router-dom';
import ServiceDetailsTable from './ServiceDetailsTable';

// Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ToggleButton = styled.button`
  margin-top: 30px;
  font-size: 20px;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  @media ${device.mobileS} {
    font-size: 18px;
  }

  @media ${device.mobileM} {
    font-size: 19px;
  }

  @media ${device.mobileL} {
    font-size: 20px;
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const PaymentDetails = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #201f1f;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
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

const DetailLine = styled.p`
  font-size: 17px;
  margin: 10px 0;
  color: #000000;

  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.mobileM} {
    font-size: 15px;
  }

  @media ${device.mobileL} {
    font-size: 16px;
  }

  @media ${device.tablet} {
    font-size: 17px;
  }
`;

const BackLink = styled.a`
  margin-top: 20px;
  font-size: 16px;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DateTimeButton = styled.button`
  margin-top: 20px;
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

// Interface
interface ServiceDetailsType {
  name: string;
  price: number;
}

const PixPage = () => {
  const [service, setService] = useState<ServiceDetailsType | null>(null);
  const [barber, setBarber] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<string | null>(null);
  const [showTable, setShowTable] = useState(false); // Estado para controle da visibilidade da tabela
  const navigate = useNavigate();

  useEffect(() => {
    const selectedService = localStorage.getItem('selectedService');
    const selectedBarber = localStorage.getItem('selectedBarber');
    const selectedServiceType = localStorage.getItem('selectedServiceType');
    const services = localStorage.getItem('services');

    if (selectedService && services) {
      const serviceList = JSON.parse(services) as ServiceDetailsType[];
      const foundService = serviceList.find((s: ServiceDetailsType) => s.name === selectedService);
      setService(foundService || null);
    }

    setBarber(selectedBarber);
    setServiceType(selectedServiceType);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDateTimeClick = () => {
    navigate('/date-time'); // Navega para a página de escolha de data e hora
  };

  const handleToggleTable = () => {
    setShowTable(prevState => !prevState); // Alterna a visibilidade da tabela
  };

  return (
    <Container>
      <Title>Pagamento com Pix</Title>
      {service && barber ? (
        <>
          <ToggleButton onClick={handleToggleTable}>
            {showTable ? 'Ocultar Detalhes do Serviço' : 'Mostrar Detalhes do Serviço'}
          </ToggleButton>
          {showTable && (
            <ServiceDetailsTable
              service={service}
              selectedServiceType={serviceType}
              barber={barber}
            />
          )}
          <PaymentDetails>
            <DetailLine><strong>Chave Pix:</strong> exemplo@pix.com</DetailLine>
            <DetailLine><strong>QR Code:</strong></DetailLine>
            <img src="https://via.placeholder.com/150" alt="QR Code Pix" />
          </PaymentDetails>
          <DateTimeButton onClick={handleDateTimeClick}>Escolha Data e Hora</DateTimeButton>
          <BackLink onClick={handleBack}>Voltar para a página anterior</BackLink>
        </>
      ) : (
        <p>Carregando informações...</p>
      )}
    </Container>
  );
};

export default PixPage;
