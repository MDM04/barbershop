// ServiceDetailsTable.tsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

// Estilos
const ServiceDetails = styled.div`
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

// Interface para as props do ServiceDetailsTable
interface ServiceDetailsTableProps {
  service: {
    name: string;
    price: number;
  } | null;
  barber: string | null;
  selectedServiceType: string | null;
}

const ServiceDetailsTable: React.FC<ServiceDetailsTableProps> = ({ service, barber, selectedServiceType }) => {
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

  return (
    service && barber ? (
      <ServiceDetails>
        <DetailLine><strong>Serviço:</strong> {service.name}</DetailLine>
        <DetailLine><strong>Preço:</strong> R${service.price.toFixed(2)}</DetailLine>
        <DetailLine><strong>Barbeiro:</strong> {barber}</DetailLine>
        <DetailLine><strong>Plano escolhido:</strong> {selectedServiceType ? convertServiceType(selectedServiceType) : 'N/A'}</DetailLine>
      </ServiceDetails>
    ) : (
      <p>Carregando informações...</p>
    )
  );
};

export default ServiceDetailsTable;
