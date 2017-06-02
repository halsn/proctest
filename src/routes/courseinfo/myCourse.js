import React from 'react'
import { connect } from 'dva'
import { Alert, Popconfirm, Spin, Input, Form, Modal, Button, Card, Row, Col } from 'antd'
import { didmount } from '../../utils'

const FormItem = Form.Item

class myCourse extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    updateCourse: {}
  }
  render() {
    const { setFieldsValue, getFieldDecorator, validateFieldsAndScroll } = this.props.form
    const { mycourse, dispatch, loading } = this.props
    const { myCourses, otherCourses, showModal, showUpdateModal } = mycourse
    const putNewCourse = () => {
      validateFieldsAndScroll((errors, values) => {
        const { coursename, coursebrief } = values
        if (!coursename || !coursebrief) return
        const payload = {
          name: coursename,
          brief: coursebrief
        }
        dispatch({ type: 'mycourse/put', payload })
      })
    }
    const deleteCourse = (id) => {
      dispatch({ type: 'mycourse/del', payload: { id } })
    }
    const openUpdateModal = (course) => {
      dispatch({ type: 'mycourse/showUpdateModal' })
      this.state.updateCourse = course
      const { name: updatecoursename, brief: updatecoursebrief } = this.state.updateCourse
      setFieldsValue({ updatecoursename, updatecoursebrief })
    }
    const update = () => {
      validateFieldsAndScroll((errors, values) => {
        const { updatecoursename, updatecoursebrief } = values
        if (!updatecoursename || !updatecoursebrief) return
        const payload = {
          id: this.state.updateCourse._id,
          name: updatecoursename,
          brief: updatecoursebrief
        }
        dispatch({ type: 'mycourse/post', payload })
      })
    }
    return (
      <div>
        <Button
          onClick={() => { dispatch({ type: 'mycourse/openModal' }) }}
          type='primary'
          style={{ marginBottom: 12 }}
        >添加课程</Button>
        <Modal
          title='添加课程'
          wrapClassName='vertical-center-modal'
          style={{ top: 20 }}
          visible={showModal}
          onOk={putNewCourse}
          onCancel={() => { dispatch({ type: 'mycourse/hideModal' }) }}
          confirmLoading={loading}
        >
          <Form layout='horizontal'>
            <FormItem label='名称：' hasFeedback>
              {getFieldDecorator('coursename', {
                rules: [
                  {
                    whitespace: true,
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
                    whitespace: true,
                    message: '不能为空'
                  }
                ]
              })(<Input type='textarea' />)}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          title='修改课程'
          wrapClassName='vertical-center-modal'
          style={{ top: 20 }}
          visible={showUpdateModal}
          onOk={update}
          onCancel={() => { dispatch({ type: 'mycourse/hideUpdateModal' }) }}
          confirmLoading={loading}
        >
          <Form layout='horizontal'>
            <FormItem label='名称：' hasFeedback>
              {getFieldDecorator('updatecoursename', {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    message: '不能为空'
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem label='简介：' hasFeedback>
              {getFieldDecorator('updatecoursebrief', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '不能为空'
                  }
                ]
              })(<Input type='textarea' />)}
            </FormItem>
          </Form>
        </Modal>
        <div>
          <Spin spinning={loading}>
            <Alert message='我的课程' />
            <br />
            <Row gutter={36}>
              {myCourses.map(c => (
                <Col key={c._id} lg={8} style={{ marginBottom: 12 }}>
                  <Card
                    title={c.name}
                    extra={
                      <Popconfirm onConfirm={() => deleteCourse(c._id)} placement='left' title='删除课程会将关联的班级一起删除，确定吗？' okText='确定' cancelText='取消'>
                        <a>删除</a>
                      </Popconfirm>
                    }
                  >
                    <p>简介：{c.brief}</p>
                    <p>习题总数：{c.quizs.length}</p>
                    <Button onClick={() => openUpdateModal(c)} style={{ float: 'right', marginBottom: 10, marginRight: -15 }}>修改</Button>
                  </Card>
                </Col>
              ))}
            </Row>
            <Alert message='云端课程' />
            <Row gutter={36}>
              {otherCourses.map(c => (
                <Col key={c._id} lg={8} style={{ marginBottom: 12 }}>
                  <Card
                    title={c.name}
                    extra={
                      <Popconfirm onConfirm={() => deleteCourse(c._id)} placement='left' title='删除课程会将关联的班级一起删除，确定吗？' okText='确定' cancelText='取消'>
                        <a>删除</a>
                      </Popconfirm>
                    }
                  >
                    <p>创建者：{c.creater}</p>
                    <p>简介：{c.brief}</p>
                    <p>习题总数：{c.quizs.length}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Spin>
        </div>
      </div>
    )
  }
}
export default connect(({ mycourse, loading }) => ({ mycourse, loading: loading.global }))(Form.create()(myCourse))
