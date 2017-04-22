import React from 'react'
import { Icon, Button, Rate, Collapse, DatePicker, Row, Col, Select } from 'antd'
import Mock from 'mockjs'
import Completed from '../../components/userinfo/completed.js'
import { didmount } from '../../utils'

const Option = Select.Option
const Panel = Collapse.Panel

class testInfo extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
  }
  render() {
    const { data } = Mock.mock({
      'data|10-20': [
        {
          'name|+1': 2008,
          'Task complete|200-1000': 1,
          'Cards Complete|200-1000': 1
        }
      ]
    })
    return (
      <div>
        <Row gutter={24}>
          <Col lg={24}>
            <DatePicker />
            <Select showSearch style={{ width: 100 }} placeholder='选择课程'>
              <Option value='lufy'>lufy</Option>
              <Option value='namy'>Namy</Option>
            </Select>
            <p>当前状态：对未进行批改的主观题进行批改</p>
          </Col>
          <Col lg={24}>
            <Collapse bordered={false}>
              <Panel header='学号1' key='1'>
                <p>题目：世世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里界的最南端在哪里？？</p>
                <p>答案：我怎么绘制到啊，你再说一边</p>
                <br />
                <p>题目：世世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里世界的最南端在哪里界的最南端在哪里？？</p>
                <p>答案：我怎么绘制到啊，你再说一边</p>
                <Rate character={<Icon type='like' />} />
                <Button>确定</Button>
              </Panel>
            </Collapse>
          </Col>
          <Col lg={24}>
            <Completed data={data} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default testInfo
