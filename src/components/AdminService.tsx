import { useState, useEffect } from 'react';
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

const Input = styled.input`
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

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const Table = styled.table`
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white; /* Fundo da tabela */
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const RadioContainer = styled.div`
  margin-top: 20px;
`;

const RadioLabel = styled.label`
  margin-right: 10px;
`;

const AdminServicePage = () => {
  const [services, setServices] = useState<{ name: string; price: number }[]>([]);
  const [newService, setNewService] = useState('');
  const [newPrice, setNewPrice] = useState<number | ''>('');
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    }
  }, []);

  const handleAddService = () => {
    if (!newService || newPrice === '') {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const price = Number(newPrice);
    if (isNaN(price)) {
      setError('O preço deve ser um número válido.');
      return;
    }

    const updatedServices = [...services, { name: newService, price }];
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    setNewService('');
    setNewPrice('');
    setError('');
  };

  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  return (
    <Container>
      <Title>Serviços</Title>
      <div>
        <Input
          type="text"
          placeholder="Nome do Serviço"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Preço"
          value={newPrice === '' ? '' : newPrice}
          onChange={(e) => setNewPrice(e.target.value === '' ? '' : Number(e.target.value))}
        />
        <Button onClick={handleAddService}>Adicionar Serviço</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
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
              <TableHeader>Preço</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index}>
                <TableData>{service.name}</TableData>
                <TableData>R${service.price.toFixed(2)}</TableData>
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

export default AdminServicePage;
