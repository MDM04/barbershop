import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import { useNavigate } from 'react-router-dom';
import ServiceDetailsTable from './ServiceDetailsTable'; // Importa o componente

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

const Subtitle = styled.h2`
  margin-top: 30px;
  font-size: 20px;
  color: #333;

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
`;

const PaymentOption = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Filtra props que não devem ser passadas para o DOM
const PaymentButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})<{ active: boolean }>`
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: ${({ active }) => (active ? '#181818' : '#19191a')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; /* Faz com que ambos os botões tenham a mesma largura */
  max-width: 200px; /* Limita a largura máxima dos botões */

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#5a6268')};
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

// Interface para as props do PaymentPage
interface ServiceDetailsType {
  name: string;
  price: number;
}

const PaymentPage = () => {
  const [service, setService] = useState<ServiceDetailsType | null>(null);
  const [barber, setBarber] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedService = localStorage.getItem('selectedService');
    const selectedBarber = localStorage.getItem('selectedBarber');
    const selectedServiceType = localStorage.getItem('selectedServiceType'); // Recupera o tipo de plano escolhido
    const services = localStorage.getItem('services');
    
    if (selectedService && services) {
      const serviceList = JSON.parse(services) as ServiceDetailsType[];
      const foundService = serviceList.find((s: ServiceDetailsType) => s.name === selectedService);
      setService(foundService || null);
    }
    
    setBarber(selectedBarber);
    setSelectedServiceType(selectedServiceType || null);
  }, []);

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
    if (method === 'cartao') {
      navigate('/credit-card'); // Redireciona para o formulário de cartão de crédito
    } else if (method === 'pix') {
      navigate('/pix-payment'); // Redireciona para a página de pagamento via Pix
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Title>Forma de Pagamento</Title>
      <ServiceDetailsTable
        service={service}
        barber={barber}
        selectedServiceType={selectedServiceType}
      />
      <Subtitle>Escolha a forma de pagamento</Subtitle>
      <PaymentOption>
        <PaymentButton
          active={paymentMethod === 'cartao' || paymentMethod === null}
          onClick={() => handlePaymentChange('cartao')}
        >
          Cartão
        </PaymentButton>
        <PaymentButton
          active={paymentMethod === 'pix'}
          onClick={() => handlePaymentChange('pix')}
        >
          Pix
        </PaymentButton>
      </PaymentOption>
      <BackLink onClick={handleBack}>Voltar para a página anterior</BackLink>
    </Container>
  );
};

export default PaymentPage;
