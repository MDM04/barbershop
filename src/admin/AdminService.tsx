import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário


// Estilos do container principal
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

  @media ${device.laptop} {
    padding: 30px;
  }

  @media ${device.desktop} {
    padding: 40px;
  }
`;


// Estilos do container do formulário
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

// Estilos do input
const Input = styled.input`
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;

  @media ${device.mobileS} {
    font-size: 12px;
    height: 38px;
  }

  @media ${device.mobileM} {
    font-size: 12px;
    height: 40px;
  }

  @media ${device.mobileL} {
    font-size: 13px;
    height: 42px;
  }

  @media ${device.tablet} {
    font-size: 14px;
    height: 44px;
  }

  @media ${device.laptop} {
    font-size: 15px;
    height: 46px;
  }
`;

// Estilos do botão
const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #0056b3;
  }

  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.mobileM} {
    font-size: 14px;
  }

  @media ${device.mobileL} {
    font-size: 15px;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }

  @media ${device.laptop} {
    font-size: 17px;
  }
`;

// Estilos do botão de excluir
const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

// Estilos da tabela
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;

  @media ${device.tablet} {
    max-width: 600px;
  }

  @media ${device.laptop} {
    max-width: 800px;
  }

  @media ${device.desktop} {
    max-width: 1000px;
  }
`;

// Estilos do cabeçalho da tabela
const TableHeader = styled.th`
  padding: 12px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 14px;

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

  @media ${device.laptop} {
    font-size: 15px;
  }
`;

// Estilos das células da tabela
const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  font-size: 14px;

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

  @media ${device.laptop} {
    font-size: 15px;
  }
`;

// Estilos do container dos rádios
const RadioContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: center;
  }
`;

// Estilos dos labels dos rádios
const RadioLabel = styled.label`
  margin-right: 10px;
  font-size: 14px;

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

  @media ${device.laptop} {
    font-size: 15px;
  }
`;


// Interface para o serviço
interface Service {
  name: string;
  price: number;
  priceMonthly: number;
  priceQuarterly: number;
  priceSemiannually: number;
  priceAnnually: number;
}

const AdminService = () => {
  // Estado para a lista de serviços
  const [services, setServices] = useState<Service[]>([]);
  // Estado para o novo serviço a ser adicionado
  const [newService, setNewService] = useState('');
  // Estado para o novo preço do serviço
  const [newPrice, setNewPrice] = useState<number | ''>('');
  const [newPriceMonthly, setNewPriceMonthly] = useState<number | ''>('');
  const [newPriceQuarterly, setNewPriceQuarterly] = useState<number | ''>('');
  const [newPriceSemiannually, setNewPriceSemiannually] = useState<number | ''>('');
  const [newPriceAnnually, setNewPriceAnnually] = useState<number | ''>('');
  // Estado para mensagens de erro
  const [error, setError] = useState('');
  // Estado para controle de visibilidade da tabela
  const [showTable, setShowTable] = useState(true);

  // Carrega os serviços do localStorage ao montar o componente
  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  // Adiciona um novo serviço à lista
  const handleAddService = () => {
    if (!newService || newPrice === '' || newPriceMonthly === '' || newPriceQuarterly === '' || newPriceSemiannually === '' || newPriceAnnually === '') {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const price = Number(newPrice);
    const priceMonthly = Number(newPriceMonthly);
    const priceQuarterly = Number(newPriceQuarterly);
    const priceSemiannually = Number(newPriceSemiannually);
    const priceAnnually = Number(newPriceAnnually);

    if (isNaN(price) || isNaN(priceMonthly) || isNaN(priceQuarterly) || isNaN(priceSemiannually) || isNaN(priceAnnually)) {
      setError('Os preços devem ser números válidos.');
      return;
    }

    const updatedServices = [...services, { name: newService, price, priceMonthly, priceQuarterly, priceSemiannually, priceAnnually }];
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setNewService('');
    setNewPrice('');
    setNewPriceMonthly('');
    setNewPriceQuarterly('');
    setNewPriceSemiannually('');
    setNewPriceAnnually('');
    setError('');
  };

  // Remove um serviço da lista
  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  return (
    <Container>
      <FormContainer>
        <Input
          type="text"
          placeholder="Nome do Serviço"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Preço Diário"
          value={newPrice === '' ? '' : newPrice}
          onChange={(e) => setNewPrice(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Preço Mensal"
          value={newPriceMonthly === '' ? '' : newPriceMonthly}
          onChange={(e) => setNewPriceMonthly(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Preço Trimestral"
          value={newPriceQuarterly === '' ? '' : newPriceQuarterly}
          onChange={(e) => setNewPriceQuarterly(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Preço Semestral"
          value={newPriceSemiannually === '' ? '' : newPriceSemiannually}
          onChange={(e) => setNewPriceSemiannually(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Preço Anual"
          value={newPriceAnnually === '' ? '' : newPriceAnnually}
          onChange={(e) => setNewPriceAnnually(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Button onClick={handleAddService}>Adicionar Serviço</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormContainer>
      <RadioContainer>
        <RadioLabel>
          <input
            type="radio"
            checked={showTable}
            onChange={() => setShowTable(true)}
          />
          Mostrar Tabela
        </RadioLabel>
        <RadioLabel>
          <input
            type="radio"
            checked={!showTable}
            onChange={() => setShowTable(false)}
          />
          Ocultar Tabela
        </RadioLabel>
      </RadioContainer>
      {showTable && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Serviço</TableHeader>
              <TableHeader>Diário</TableHeader>
              <TableHeader>Mensal</TableHeader>
              <TableHeader>Trimestral</TableHeader>
              <TableHeader>Semestral</TableHeader>
              <TableHeader>Anual</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <TableData>{service.name}</TableData>
                <TableData>
                  {service.price != null ? `R$${service.price.toFixed(2)}` : 'N/A'}
                </TableData>
                <TableData>
                  {service.priceMonthly != null ? `R$${service.priceMonthly.toFixed(2)}` : 'N/A'}
                </TableData>
                <TableData>
                  {service.priceQuarterly != null ? `R$${service.priceQuarterly.toFixed(2)}` : 'N/A'}
                </TableData>
                <TableData>
                  {service.priceSemiannually != null ? `R$${service.priceSemiannually.toFixed(2)}` : 'N/A'}
                </TableData>
                <TableData>
                  {service.priceAnnually != null ? `R$${service.priceAnnually.toFixed(2)}` : 'N/A'}
                </TableData>
                <TableData>
                  <DeleteButton onClick={() => handleDeleteService(index)}>Excluir</DeleteButton>
                </TableData>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminService;
