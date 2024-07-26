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
`;

// Estilos do título
const Title = styled.h1`
  margin-bottom: 20px;
`;

// Estilos do input
const Input = styled.input`
  margin: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

// Estilos do botão
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
  max-width: 600px;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white; /* Fundo da tabela */
`;

// Estilos do cabeçalho da tabela
const TableHeader = styled.th`
  padding: 12px;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  text-align: left;
`;

// Estilos das células da tabela
const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

// Estilos do container dos rádios
const RadioContainer = styled.div`
  margin-top: 20px;
`;

// Estilos dos labels dos rádios
const RadioLabel = styled.label`
  margin-right: 10px;
`;

// Interface para o serviço
interface Service {
  name: string;
  price: number;
}

const AdminServicePage = () => {
  // Estado para a lista de serviços
  const [services, setServices] = useState<Service[]>([]);
  // Estado para o novo serviço a ser adicionado
  const [newService, setNewService] = useState('');
  // Estado para o novo preço do serviço
  const [newPrice, setNewPrice] = useState<number | ''>('');
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

  // Remove um serviço da lista
  const handleDeleteService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  return (
    <Container>
      <Title>Serviços</Title>
      <div>
        {/* Campo de entrada para o nome do serviço */}
        <Input
          type="text"
          placeholder="Nome do Serviço"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        {/* Campo de entrada para o preço do serviço */}
        <Input
          type="number"
          placeholder="Preço"
          value={newPrice === '' ? '' : newPrice}
          onChange={(e) => setNewPrice(e.target.value === '' ? '' : Number(e.target.value))}
        />
        {/* Botão para adicionar um novo serviço */}
        <Button onClick={handleAddService}>Adicionar Serviço</Button>
        {/* Exibição de mensagem de erro */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <RadioContainer>
        {/* Rádio para mostrar a tabela */}
        <RadioLabel>
          <input
            type="radio"
            checked={showTable}
            onChange={() => setShowTable(true)}
          />
          Mostrar Tabela
        </RadioLabel>
        {/* Rádio para ocultar a tabela */}
        <RadioLabel>
          <input
            type="radio"
            checked={!showTable}
            onChange={() => setShowTable(false)}
          />
          Ocultar Tabela
        </RadioLabel>
      </RadioContainer>
      {/* Exibição condicional da tabela de serviços */}
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
