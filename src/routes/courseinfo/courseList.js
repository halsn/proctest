import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { didmount } from '../../utils';
import Search from '../../components/courseinfo/search';
import Courselist from '../../components/courseinfo/list';

const obj = {
  key: '1',
  courseName: '计算机组织与结构',
  single: 5,
  multiple: 5,
  estimation: 5,
  essay: 5,
  total: 11
};

const dataSource = Array(100).fill(obj).map((el, idx) => ({ ...el, key: idx, single: idx }));

const courseList = ({ courselist, dispatch, loading }) => {
  const courseListProps = {
    loading,
    onPageChange() {
      dispatch({ type: 'courselist/query' });
    },
    dataSource
  };
  return (
    <div className='content-inner'>
      <Row gutter={24}>
        <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
          <Search />
        </Col>
      </Row>
      <Row gutter={24}>
        <Courselist {...courseListProps} />
      </Row>
    </div>
  );
};

export default connect(({ courselist, loading }) => ({ courselist, loading: loading.global }))(didmount(courseList));
