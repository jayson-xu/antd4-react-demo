import React, { useState, useEffect } from 'react';
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
    });
  };

  const { data, pagination, loading } = state;
  return (
    <Table
      columns={columns}
      rowKey={record => record.login.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default TableDemo;
