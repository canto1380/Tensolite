import React from "react";
import {  Table } from "antd";
const TableFormat = ({ columns, data, id }) => {
  return (
    <div className='mt-5'>
      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        >
        
        </Table>
    </div>
  );
};

export default TableFormat;
