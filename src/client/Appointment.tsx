import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import FormInput from '../components/FormInput';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';
import {  Table } from 'antd';
import 'antd/dist/reset.css';

// Estilos do Container
const Container = styled.div`
  max-width: 600px;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background-color: rgb(238, 230, 119);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);

  @media ${device.mobileS} {
    padding: 10px;
    max-width: 100%;
  }

  @media ${device.mobileM} {
    padding: 15px;
    max-width: 100%;
  }

  @media ${device.tablet} {
    padding: 20px;
    max-width: 90%;
  }

  @media ${device.laptop} {
    padding: 25px;
    max-width: 600px;
  }
`;

// Estilos do Título
const Title = styled.h1`
  font-size: 25px;
  color: #007bff;
  text-align: center;
  margin: 0px 0 80px;

  @media ${device.mobileS} {
    font-size: 16px;
  }

  @media ${device.mobileM} {
    font-size: 18px;
  }

  @media ${device.tablet} {
    font-size: 20px;
  }

  @media ${device.laptop} {
    font-size: 25px;
  }
`;

// Estilos do Botão
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

// Estilos da Tabela
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #007bff;
    color: #f9f9f9;
    font-weight: bold;
    font-size: 16px;
  }

  .ant-table-tbody > tr > td {
    background-color: #09346d;
    color: #333;
    font-size: 14px;
  }

  .ant-table-tbody > tr:nth-child(odd) > td {
    background-color: #f9f9f9;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #e6edff;
  }

  .ant-table-cell {
    padding: 12px;
  }

  .ant-table {
    margin-top: 20px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Appointment = () => {
  // Configuração do useForm
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  // Estado para controlar o texto do botão
  const [buttonText, setButtonText] = useState('Salvar');

  // Estado para armazenar os dados da tabela
  const [dataSource, setDataSource] = useState<any[]>([]);

  // Estado para controlar a visibilidade da tabela
  const [showTable, setShowTable] = useState(false);

  // Aplicando máscara aos campos de formulário
  const registerWithMask = useHookFormMask(register);

  // Definindo as colunas da tabela
  const columns = [
    {
      title: 'Nome : ',
      dataIndex: 'name',
      key: 'name', 
    },
    {
      title: 'Telefone : ',
      dataIndex: 'phone',
      key: 'phone'
    },
  ];

  // Função chamada ao submeter o formulário
  const onSubmit: SubmitHandler<any> = async (data) => {
    // Simula o salvamento dos dados e atualiza o texto do botão
    console.log(data);
    setButtonText('Salvo');

    // Adiciona os dados à tabela
    setDataSource((prevData) => [...prevData, data]);

    // Limpa os campos após o envio
    reset();

    // Mostra a tabela após o envio dos dados
    setShowTable(true);
  };

  return (
    <Container>
      <Title>Cadastre-se</Title>
      <FormInput
        description="Nome : "
        placeholder="Digite seu nome ..."
        id="name"
        register={register('name', { required: 'Campo obrigatório!' })}
        required={true}
        messageError={errors.name?.message}
      />
      <FormInput
        description="Telefone:"
        id="phone"
        placeholder="Digite seu telefone ... "
        register={registerWithMask('phone', ['(99) 9 9999-9999'], {
          required: 'Campo obrigatório',
          validate: (value: string) =>
            value.replace(/[^\d]/g, '').length === 11 ||
            'O telefone deve ter exatamente 11 caracteres',
        })}
        required={true}
        messageError={errors.phone?.message}
      />
      <Button type="button" onClick={handleSubmit(onSubmit)}>
        {buttonText}
      </Button>

      {/* Exibe a tabela somente se `showTable` for verdadeiro */}
      {showTable && (
        <StyledTable
          dataSource={dataSource}
          columns={columns}
          rowKey="name"
          pagination={false}
        />
      )}
    </Container>
  );
};

export default Appointment;
