import React from 'react'
import { Input, Form, Modal, Button, Card, Row, Col } from 'antd'
import { didmount } from '../../utils'

const FormItem = Form.Item

class myCourse extends React.Component {
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
        <Row>
        </Row>
        <Button
          onClick={() => { this.setState({ modalVisible: true }) }}
          type='primary'
          style={{ marginBottom: 12 }}
        >添加课程</Button>
        <Modal
          title='添加课程'
          wrapClassName='vertical-center-modal'
          style={{ top: 20 }}
          visible={this.state.modalVisible}
          onOk={() => { this.setState({ modalVisible: false })}}
          onCancel={() => { this.setState({ modalVisible: false })}}
        >
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
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
        <Row gutter={36}>
          <p>我创建的课程</p>
          <Col lg={8} style={{ marginBottom: 12 }}>
            <Card title='计算机基础' extra={<a href='#'>删除</a>}>
              <p>简介：计算机基础而已，没什么大不了的</p>
            </Card>
          </Col>
        </Row>
        <Row gutter={36}>
          <p>公共课程</p>
          <Col lg={8} style={{ marginBottom: 12 }}>
            <Card title='计算机基础' extra={<a href='#'>删除</a>}>
              <p>创建者：fff</p>
              <p>简介：计算机基础而已，没什么大不了的</p>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(myCourse)
