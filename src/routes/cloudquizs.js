import React from 'react'
import { connect } from 'dva'
import { Row, Col, Select } from 'antd'
import Search from '../components/courseinfo/search'
import Courselist from '../components/courseinfo/list'

const Option = Select.Option

// const obj = {
  // key: '1',
  // courseName: '计算机组织与结构',
  // single: 5,
  // multiple: 5,
  // estimation: 5,
  // essay: 5,
  // total: 11
// }
// const dataSource = Array(100).fill(obj).map((el, idx) => ({ ...el, key: idx, single: idx }))

class Cloud extends React.Component {
  state = {
    name: 'foo'
  }
  search() {
    console.log(this.state)
  }
  render() {
    return (
      <div className='content-inner'>
        <Row gutter={24} style={{ marginBottom: 16 }}>
          <Col lg={2} style={{ marginBottom: 16 }}>
            <Select defaultValue='course' style={{ width: '80px' }}>
              <Option value='course'>课程</Option>
              <Option value='keyword'>关键词</Option>
            </Select>
          </Col>
          <Col lg={8}>
            <Search />
          </Col>
        </Row>
        <Row gutter={24}>
          <Courselist />
        </Row>
      </div>
    )
  }
}

export default connect(({ app }) => ({ app }))(Cloud)
