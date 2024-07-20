import React from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import 'antd/dist/reset.css';

const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 10px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #fafafa;
  }

  .ant-table-tbody > tr:nth-child(even) {
    background-color: #ffffff;
  }
`;

interface ITableComponentProps {
  dataSource: any[];
  columns: any[];
}

const TableComponent: React.FC<ITableComponentProps> = ({ dataSource, columns }) => {
  return (
    <StyledTable
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  );
};

export default TableComponent;
