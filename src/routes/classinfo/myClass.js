import React from 'react'
import { Select, Input, Form, Modal, Button, Card, Row, Col } from 'antd'
import { didmount } from '../../utils'

const FormItem = Form.Item
const Option = Select.Option

class myClass extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    modalVisible: false
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Button onClick={() => { this.setState({ modalVisible: true }) }} type='primary' style={{ marginBottom: 12 }}>添加班级</Button>
        <Modal
          title='添加班级'
          wrapClassName='vertical-center-modal'
          visible={this.state.modalVisible}
          onOk={() => { this.setState({ modalVisible: false }) }}
          onCancel={() => { this.setState({ modalVisible: false }) }}
        >
          <Select placeholder='选择课程' style={{ width: '100%' }}>
            <Option value='1'>计算机</Option>
            <Option value='2'>计算机</Option>
          </Select>
          <Form layout='horizontal'>
            <FormItem label='名称：' hasFeedback>
              {getFieldDecorator('coursename', {
                rules: [
                  {
                    required: true,
                    message: '不能为空'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label='简介：' hasFeedback>
              {getFieldDecorator('coursebrief', {
                rules: [
                  {
                    required: true,
                    message: '不能为空'
                  }
                ]
              })(<Input type='textarea' />)}
            </FormItem>
          </Form>
        </Modal>
        <Row gutter={36}>
          <Col lg={8} style={{ marginBottom: 12 }}>
            <Card title='计算机科学201301' extra={<a>删除</a>}>
              <p>计算机科学2013级同学的课程，主要教学</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(myClass)
