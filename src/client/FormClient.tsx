import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import 'antd/dist/reset.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Estilos do container principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

// Estilos da tabela
const StyledTable = styled(AntTable)`
  margin-top: 20px;
  width: 680px; /* Ajusta a largura da tabela para igualar a dos inputs */

  .ant-table-cell {
    padding: 8px; /* Ajusta o padding das células para ficar alinhado com os inputs */
  }

  .ant-table-thead > tr > th {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px; /* Ajusta o padding dos cabeçalhos */
  }

  .ant-table-tbody > tr > td {
    border: 1px solid #ddd;
  }
`;

const P = styled.p`
  color: red;
  margin: 5px;
`;

// Interface para o formulário
interface FormData {
  name: string;
  phone: string;
  date: Date | null;
}

const FormWithTable = () => {
  // Configuração do useForm
  const { handleSubmit, register, formState: { errors }, reset } = useForm<FormData>();

  // Estado para armazenar os dados da tabela
  const [dataSource, setDataSource] = useState<FormData[]>([]);

  // Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Definindo as colunas da tabela
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Data de Nascimento',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date | null) => date ? date.toLocaleDateString() : '',
    },
  ];

  // Função chamada ao submeter o formulário
  const onSubmit: SubmitHandler<FormData> = (data) => {
    setDataSource((prevData) => [...prevData, { ...data, date: selectedDate }]);
    reset();
    setSelectedDate(null); // Limpa a data selecionada
  };

  return (
    <Container>
      <Title>Cadastre-se</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Digite seu nome"
          {...register('name', { required: 'Nome é obrigatório' })}
        />
        {errors.name && <P>{errors.name.message}</P>}
        <Input
          type="text"
          placeholder="Digite seu telefone"
          {...register('phone', { required: 'Telefone é obrigatório' })}
        />
        {errors.phone && <P>{errors.phone.message}</P>}
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Data de nascimento"
          showPopperArrow={false}
          customInput={<Input />} // Usa o mesmo estilo do input para o DatePicker
          popperPlacement="bottom" // Ajusta a posição do popper
        />
        <Button type="submit">Salvar</Button>
      </form>
      <StyledTable
        dataSource={dataSource}
        columns={columns}
        rowKey="name"
        pagination={false}
      />
    </Container>
  );
};

export default FormWithTable;
