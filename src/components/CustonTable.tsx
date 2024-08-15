import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import { device } from '../config/MediaQuery';

// Estilos responsivos para a tabela
const ResponsiveTable = styled(Table)`
    .ant-table {
        overflow-x: auto;
    }

    .ant-table-tbody > tr {
        @media ${device.mobileS} {
            display: block;
            margin-bottom: 20px;
        }
    }

    .ant-table-tbody > tr > td {
        @media ${device.mobileS} {
            display: block;
            text-align: left;
            padding: 10px;
            border: none;
            position: relative;
            &:before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                top: 0;
                width: 150px;
                font-weight: bold;
                background: #f9f9f9;
                padding: 5px;
            }
        }
    }

    @media ${device.mobileS} {
        .ant-table-thead > tr {
            display: none;
        }
    }
`;

// Interface para as props da tabela
interface CustonTableProps {
    columns: any[];
    data: DataType[];
    pageSize?: number;
}

// Interface para os dados da tabela
interface DataType {
    key: string;
    [key: string]: any; // Permite que os dados tenham qualquer chave e valor
}

// Componente da tabela
const CustonTable: React.FC<CustonTableProps> = ({ columns, data, pageSize = 10 }) => {
    // Adiciona atributo data-label às colunas
    const enhancedColumns = columns.map(col => ({
        ...col,
        render: (text: any) => <div data-label={col.title}>{text}</div>,
    }));

    return (
        <ResponsiveTable
            columns={enhancedColumns}
            dataSource={data}
            pagination={{ pageSize }}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default CustonTable;
