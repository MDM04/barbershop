import styled from 'styled-components';
import CustonTable from '../components/CustonTable'; // Corrija o caminho se necessário
import { device } from '../config/MediaQuery';
import { useNavigate } from 'react-router-dom'; // Importação para navegação
import { useEffect, useState } from 'react';

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

// Definindo a interface para as propriedades de HighlightedName
interface HighlightedNameProps {
  isToday: boolean;
}

const HighlightedName = styled.span<HighlightedNameProps>`
  color: ${props => props.isToday ? 'red' : 'black'};
  font-weight: ${props => props.isToday ? 'bold' : 'normal'};
`;

// Função para calcular os dias restantes até o próximo aniversário
const calculateDaysUntilBirthday = (birthday: string): number => {
  const today = new Date();
  const [day, month] = birthday.split('/').map(Number);
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);

  // Se o aniversário já passou este ano, calcula para o próximo ano
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertendo milissegundos para dias
};

// Função para verificar se hoje é o aniversário
const isTodayBirthday = (birthday: string): boolean => {
  const today = new Date();
  const [day, month] = birthday.split('/').map(Number);
  return today.getDate() === day && today.getMonth() === month - 1;
};

// Definindo as colunas da tabela
const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'nome',
    render: (text: string, record: any) => (
      <HighlightedName isToday={isTodayBirthday(record.dataAniversario)}>
        {text}
      </HighlightedName>
    ),
  },
  {
    title: 'Data de Aniversário',
    dataIndex: 'dataAniversario',
    key: 'dataAniversario',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
    key: 'telefone',
  },
  {
    title: 'Contagem Regressiva',
    dataIndex: 'countdown',
    key: 'countdown',
  },
];

// Dados da tabela
const generateData = () => {


  return [
    {
      key: '1',
      nome: 'Maria Silva',
      dataAniversario: '13/08/1985',
      telefone: '1234-5678',
      countdown: isTodayBirthday('13/08/1985')
        ? 'Parabéns!'
        : calculateDaysUntilBirthday('13/08/1985') <= 30
        ? `Faltam ${calculateDaysUntilBirthday('13/08/1985')} dias`
        : '',
    },
    {
      key: '2',
      nome: 'João Pereira',
      dataAniversario: '23/11/1990',
      telefone: '8765-4321',
      countdown: isTodayBirthday('23/11/1990')
        ? 'Parabéns!'
        : calculateDaysUntilBirthday('23/11/1990') <= 30
        ? `Faltam ${calculateDaysUntilBirthday('23/11/1990')} dias`
        : '',
    },
    // Outros dados podem ser adicionados aqui
  ];
};

// Componente funcional AnniversaryPage
const AdminAnniversaryPage = () => {
  const navigate = useNavigate(); // Hook para navegação
  const [data, setData] = useState(generateData()); // Inicializando os dados da tabela

  useEffect(() => {
    setData(generateData()); // Atualiza os dados sempre que o componente é renderizado
  }, []);

  const handleBackToMenu = () => {
    navigate('/admin/admin-home'); // Ajuste o caminho conforme necessário
  };

  return (
    <Container>
      <MainTitle>Data de Aniversário</MainTitle>
      <CustonTable columns={columns} data={data} pageSize={10} />
      <BackButton onClick={handleBackToMenu}>Voltar ao Painel</BackButton>
    </Container>
  );
};

export default AdminAnniversaryPage;
