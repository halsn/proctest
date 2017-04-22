import React from 'react'
import { Slider, Button, Table, Row, Col, Select } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

class pubTest extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
  }
  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col lg={24}>
            <Select showSearch style={{ width: 100 }} placeholder='选择班级'>
              <Option value='lufy'>Lufy</Option>
              <Option value='namy'>Namy</Option>
            </Select>
            <Button>发布</Button>
          </Col>
          <Col lg={24}>
            <p>单选题总数：10</p>
            <p>多选题总数：10</p>
            <p>判断提总数：10</p>
            <p>问答题总数：10</p>
          </Col>
          <Col style={{ display: 'flex' }}>
            <p style={{ flex: 1 }}>单选题：</p>
            <Slider style={{ flex: 5}} />
          </Col>
          <Col style={{ display: 'flex' }}>
            <p style={{ flex: 1 }}>多选题：</p>
            <Slider style={{ flex: 5}} />
          </Col>
          <Col style={{ display: 'flex' }}>
            <p style={{ flex: 1 }}>判断题：</p>
            <Slider style={{ flex: 5}} />
          </Col>
          <Col style={{ display: 'flex' }}>
            <p style={{ flex: 1 }}>问答题：</p>
            <Slider style={{ flex: 5}} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default pubTest
