import styled from 'styled-components';
import CustonTable from '../components/CustonTable'; // Corrigido para 'CustonTable'
import { device } from '../config/MediaQuery';
import { useNavigate } from 'react-router-dom'; // Importação para navegação

// Estilo do Container com base no estilo do ForgotPasswordPage
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #FFD700 0%, #FFFACD 50%, #FFD700 100%);
  height: 100vh;
  box-sizing: border-box;

  @media ${device.mobileS} {
    padding: 10px;
  }

  @media ${device.tablet} {
    padding: 15px;
  }

  @media ${device.laptop} {
    padding: 20px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;

  @media ${device.mobileS} {
    font-size: 1.2rem;
  }
  @media ${device.mobileM} {
    font-size: 1.5rem;
  }

  @media ${device.tablet} {
    font-size: 1.75rem;
  }

  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// Definindo as colunas da tabela
const columns = [
  {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
    key: 'telefone',
  },
  {
    title: 'Valor',
    dataIndex: 'valor',
    key: 'valor',
  },
  {
    title: 'Barbeiro',
    dataIndex: 'barbeiro',
    key: 'barbeiro',
  },
  {
    title: 'Horário',
    dataIndex: 'horario',
    key: 'horario',
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Plano',
    dataIndex: 'plano',
    key: 'plano',
  },
];

// Dados da tabela
const data = [
  {
    key: '1',
    cliente: 'John Doe',
    telefone: '123456789',
    valor: 'R$ 40',
    barbeiro: 'Joe',
    horario: '10:00 AM',
    plano: 'mensal',
    data: '24/08/2024',
  },
  // Outros dados podem ser adicionados aqui
];

// Componente funcional SchedulingPage
const AdminSchedulingPage = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleBackToMenu = () => {
    navigate('/admin/admin-home'); // Ajuste o caminho conforme necessário
  };

  return (
    <Container>
      <MainTitle>Agendamento do Dia</MainTitle>
      <CustonTable columns={columns} data={data} pageSize={10} />
      <BackButton onClick={handleBackToMenu}>Voltar ao Painel</BackButton>
    </Container>
  );
};

export default AdminSchedulingPage;
