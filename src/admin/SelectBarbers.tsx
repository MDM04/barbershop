import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../config/MediaQuery'; // Ajuste o caminho conforme necessário

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// Wrapper para os inputs e botão
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 300px;
`;

// Estilos do input
const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 40px;

  @media ${device.mobileS} {
    padding: 6px;
    font-size: 12px;
    height: 38px;
  }

  @media ${device.mobileM} {
    padding: 7px;
    font-size: 12px;
    height: 38px;
  }

  @media ${device.mobileL} {
    padding: 8px;
    font-size: 13px;
    height: 40px;
  }

  @media ${device.tablet} {
    padding: 8px;
    font-size: 14px;
    height: 40px;
  }
`;

// Estilos do botão
const Button = styled.button`
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
const DeleteButton = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #c82333;
  }
`;

// Estilos da tabela
const Table = styled.table`
  width: 100%;
  max-width: 300px;
  border-collapse: collapse;
  margin-top: 16px;

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
    max-width: 70%;
  }
`;

// Estilos do cabeçalho da tabela
const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
  text-align: left;
`;

// Estilos das células da tabela
const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

// Estilos das linhas da tabela
const TableRow = styled.tr`
  background-color: #f9f9f9;

  &:nth-child(even) {
    background-color: #f1f1f1;
  }
`;

// Wrapper para os radios de visibilidade da tabela
const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`;

// Estilos dos labels dos radios
const RadioLabel = styled.label`
  margin-left: 8px;
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
`;

// Estilos da mensagem de erro
const ErrorMessage = styled.p`
  font-size: 12px;
  color: rgb(221, 58, 58);
  margin-top: 4px;

  @media ${device.mobileS} {
    font-size: 10px;
  }

  @media ${device.mobileM} {
    font-size: 10px;
  }

  @media ${device.mobileL} {
    font-size: 11px;
  }

  @media ${device.tablet} {
    font-size: 12px;
  }
`;

// Interface para Barbeiro
interface Barber {
  name: string;
}

const SelectBarbers = () => {
  // Estado para a lista de barbeiros
  const [barbers, setBarbers] = useState<Barber[]>([]);
  // Estado para o novo barbeiro a ser adicionado
  const [newBarber, setNewBarber] = useState('');
  // Estado para mensagens de erro
  const [error, setError] = useState('');
  // Estado para controle de visibilidade da tabela
  const [showTable, setShowTable] = useState(true);

  // Carrega os barbeiros do localStorage ao montar o componente
  useEffect(() => {
    const storedBarbers = localStorage.getItem('barbers');
    if (storedBarbers) {
      setBarbers(JSON.parse(storedBarbers));
    }
  }, []);

  // Adiciona um novo barbeiro à lista
  const handleAddBarber = () => {
    if (newBarber.trim() === '') {
      setError('Nome do barbeiro não pode estar vazio.');
      return;
    }

    const updatedBarbers = [...barbers, { name: newBarber }];
    setBarbers(updatedBarbers);
    localStorage.setItem('barbers', JSON.stringify(updatedBarbers));
    setNewBarber('');
    setError('');
  };

  // Remove um barbeiro da lista
  const handleDeleteBarber = (nameToDelete: string) => {
    const updatedBarbers = barbers.filter(barber => barber.name !== nameToDelete);
    setBarbers(updatedBarbers);
    localStorage.setItem('barbers', JSON.stringify(updatedBarbers));
  };

  return (
    <Container>
      <h1>Barbeiros</h1>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Nome do barbeiro"
          value={newBarber}
          onChange={(e) => setNewBarber(e.target.value)}
        />
        <Button onClick={handleAddBarber}>Adicionar</Button>
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <RadioWrapper>
        <input
          type="radio"
          id="showTable"
          name="tableVisibility"
          checked={showTable}
          onChange={() => setShowTable(true)}
        />
        <RadioLabel htmlFor="showTable">Mostrar Tabela</RadioLabel>
        <input
          type="radio"
          id="hideTable"
          name="tableVisibility"
          checked={!showTable}
          onChange={() => setShowTable(false)}
        />
        <RadioLabel htmlFor="hideTable">Ocultar Tabela</RadioLabel>
      </RadioWrapper>
      {showTable && (
        <Table>
          <thead>
            <tr>
              <TableHeader>Barbeiro</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber, index) => (
              <TableRow key={index}>
                <TableCell>{barber.name}</TableCell>
                <TableCell>
                  <DeleteButton onClick={() => handleDeleteBarber(barber.name)}>Excluir</DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SelectBarbers;
