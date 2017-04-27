/* global localStorage document window */
import React from 'react'
import { connect } from 'dva'
import { Spin, Row, Col, Select, Table, Button } from 'antd'
import Search from '../components/courseinfo/search'
import styles from '../components/courseinfo/list.less'
import { didmount } from '../utils'

const Option = Select.Option

const columns = [
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '创建者',
    dataIndex: 'creater',
    key: 'creater'
  }, {
    title: '课程简介',
    dataIndex: 'brief',
    key: 'brief'
  }, {
    title: '使用人数',
    dataIndex: 'userCount',
    key: 'userCount'
  }
]

class Cloud extends React.Component {
  constructor(props) {
    super(props)
    didmount(this)
  }
  render() {
    const { loading, dispatch, app, cloud } = this.props
    const { username } = app
    const { displayData, courseList, selectedRowKeys } = cloud
    const dataSource = displayData.map(d => ({
      key: d._id,
      ...d
    }))
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        dispatch({ type: 'cloud/select', selectedRowKeys })
      },
      getCheckboxProps: record => ({
        disabled: record.creater === username
      })
    }
    const search = (value) => {
      const { keyword } = value
      dispatch({ type: 'cloud/search', keyword })
    }
    const addToMyCourse = () => {
      if (!selectedRowKeys.length) return
      const data = selectedRowKeys.map(idx => courseList[idx])
      dispatch({ type: 'cloud/put', payload: data })
    }
    return (
      <div className='content-inner'>
        <Row gutter={12} style={{ display: 'flex', marginBottom: 16 }}>
          <Col lg={2} style={{ width: 80 }}>
            <Select defaultValue='course' style={{ width: '100%' }}>
              <Option value='course'>课程</Option>
            </Select>
          </Col>
          <Col lg={6}>
            <Search onSearch={search} />
          </Col>
        </Row>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col lg={2}>
            <Button loading={loading} type='primary' onClick={addToMyCourse}>添加至我的课程</Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <div>
            <Spin spinning={loading}>
              <Table
                className={styles.table}
                scroll={{ x: 1200 }}
                columns={columns}
                rowSelection={rowSelection}
                dataSource={dataSource}
              />
            </Spin>
          </div>
        </Row>
      </div>
    )
  }
}

export default connect(({ app, cloud, loading }) => ({ app, cloud, loading: loading.global }))(Cloud)
