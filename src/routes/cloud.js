import React from 'react'
import { connect } from 'dva'
import { Row, Col, Select, Table, Button } from 'antd'
import Search from '../components/courseinfo/search'
import styles from '../components/courseinfo/list.less'

const Option = Select.Option


const columns = [
  {
    title: '课程名称',
    dataIndex: 'courseName',
    key: 'courseName'
  }, {
    title: '创建者',
    dataIndex: 'creater',
    key: 'creater'
  }, {
    title: '课程简介',
    dataIndex: 'courseinfo',
    key: 'courseinfo'
  }, {
    title: '使用人数',
    dataIndex: 'usercount',
    key: 'usercount'
  }
]

const obj = {
  key: '1',
  single: 5,
  multiple: 5,
  estimation: 5,
  essay: 5,
  total: 11
}

const dataSource = Array(100).fill(obj).map((el, idx) => ({ ...el, key: idx, single: idx, courseName: idx % 2 === 0 ? 'fff' : 'ddd' }))

class Cloud extends React.Component {
  state = {
    selectedRowKeys: [],
    originData: dataSource,
    displayData: dataSource
  }
  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
      }
    }
    const search = (value) => {
      const { keyword } = value
      const { originData } = this.state
      if (!keyword) {
        this.setState({ displayData: originData })
        return
      }
      const matchData = originData.filter(d => d.courseName === keyword)
      this.setState({ displayData: matchData })
    }
    const addToMyCourse = () => {
      console.log(selectedRowKeys)
    }
    return (
      <div className='content-inner'>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col lg={2} style={{ marginBottom: 16 }}>
            <Select defaultValue='course' style={{ width: '80px' }}>
              <Option value='course'>课程</Option>
            </Select>
          </Col>
          <Col lg={8}>
            <Search onSearch={search} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={2} style={{ marginBottom: 16 }}>
            <Button type='primary' onClick={addToMyCourse}>添加至我的课程</Button>
          </Col>
        </Row>
        <Row gutter={24}>
          <Table
            className={styles.table}
            scroll={{ x: 1200 }}
            columns={columns}
            rowSelection={rowSelection}
            dataSource={this.state.displayData}
          />
        </Row>
      </div>
    )
  }
}

export default connect(({ app }) => ({ app }))(Cloud)
