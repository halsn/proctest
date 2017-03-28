import React from 'react';
import { Table } from 'antd';
import styles from './list.less';

const list = ({
  loading,
  dataSource,
  pagination,
  onPageChange
}) => {
  const columns = [
    {
      title: '课程名称',
      dataIndex: 'courseName',
      key: 'courseName'
    }, {
      title: '单选题',
      dataIndex: 'single',
      key: 'single'
    }, {
      title: '多选题',
      dataIndex: 'multiple',
      key: 'multiple'
    }, {
      title: '判断题',
      dataIndex: 'estimation',
      key: 'estimation'
    }, {
      title: '问答题',
      dataIndex: 'essay',
      key: 'essay'
    }, {
      title: '总数',
      dataIndex: 'total',
      key: 'total'
    }
  ];

  return (
    <div>
      <Table
        className={styles.table}
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
      />
    </div>
  );
};

export default list;
