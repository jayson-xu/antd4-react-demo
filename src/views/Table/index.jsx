import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

const initState = {
  data: [],
  pagination: {
    current: 1,
    pageSize: 10,
  },
  loading: false,
};

const getRandomuserParams = params => {
  //console.log('getRandomuserParams', params);
  return {
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  };
};

const TableDemo = () => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    console.log('useEffect', state.pagination);
    if (state.pagination) {
      fetch({ pagination: state.pagination });
    }
  }, []);

  // 调整Table组件的高度，当数据不够时也撑满客户区
  const adjustTableHeight = () => {
    setTimeout(() => {
      let elTable = document.querySelector('#table2 .ant-table-body table');
      let elTbody = elTable.querySelector('tbody');
      let tableBodyHeight = elTbody.offsetHeight;
      //console.log('table height', tableBodyHeight);
      let remainHeight = tableBodyHeight + 120; //这个120需要实际去计算除表格之外其他组件的高度之和
      let divHeight = `calc(100vh - ${remainHeight}px)`;
      //创建一个div，用于撑高table
      var idOfDivBlank = 'div_blank_in_table2';
      var divBlank = document.createElement('div');
      divBlank.id = idOfDivBlank;
      divBlank.style.height = divHeight;
      let elExisted = document.getElementById(idOfDivBlank);
      if (elExisted) {
        elExisted.remove();
      }
      elTable.appendChild(divBlank);
    }, 10);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setState({ loading: true });
    axios.get('https://randomuser.me/api', { params: getRandomuserParams(params) }).then(res => {
      console.log('fetch', res);
      setState({
        loading: false,
        data: res.data.results,
        pagination: {
          ...params.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
      adjustTableHeight();
    });
  };

  const { data, pagination, loading } = state;
  return (
    <Table
      id="table2"
      columns={columns}
      rowKey={record => record.login.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      scroll={{ y: 'calc(100vh - 120px)' }}
    />
  );
};

export default TableDemo;
