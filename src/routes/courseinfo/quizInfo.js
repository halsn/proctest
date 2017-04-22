import React from 'react'
import { Table, Row, Col, Select } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

class quizInfo extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
  }
  render() {
    const columns = [
      {
        title: '题型',
        dataIndex: 'genre',
        key: 'genre',
        width: '10%'
      }, {
        title: '题目',
        dataIndex: 'describe',
        key: 'describe',
        width: '40%'
      }, {
        title: '选项',
        dataIndex: 'selections',
        key: 'selections',
        width: '25%'
      }, {
        title: '参考答案',
        dataIndex: 'answers',
        key: 'answers',
        width: '25%'
      }
    ]

    return (
      <div>
        <Row>
          <Col>
            <Select
              showSearch
              style={{ width: 100 }}
              placeholder='选择课程'
            >
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <Table
              columns={columns}
              scroll={{ x: 1200 }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default quizInfo
