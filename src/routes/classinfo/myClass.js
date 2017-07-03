import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Alert, Spin, Select, Input, Form, Modal, Button, Card, Row, Col } from 'antd'
import is from 'is_js'

const FormItem = Form.Item
const Option = Select.Option
class myClass extends React.Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false,
      currentTerm: '',
      currentCourse: '',
      updateClass: {}
    }
  }
  render () {
    const { setFieldsValue, getFieldDecorator, validateFieldsAndScroll } = this.props.form
    const { myclass, dispatch, loading } = this.props
    const { classList, courseList, termList, showModal, showUpdateModal } = myclass
    const putNewClass = () => {
      validateFieldsAndScroll((errors, values) => {
        const { classname, classbrief } = values
        const { currentTerm, currentCourse } = this.state
        if (is.any.empty([classname, classbrief, currentTerm, currentCourse])) return
        const payload = {
          name: classname,
          brief: classbrief,
          term: currentTerm,
          refCourse: currentCourse
        }
        dispatch({ type: 'myclass/put', payload })
      })
    }
    const deleteClass = (id) => {
      dispatch({ type: 'myclass/del', payload: { id } })
    }
    const openUpdateModal = (updateClass) => {
      dispatch({ type: 'myclass/showUpdateModal' })
      this.state.updateClass = updateClass
      const { name, brief } = updateClass
      setFieldsValue({ updateclassname: name, updateclassbrief: brief })
    }
    const update = () => {
      validateFieldsAndScroll((errors, values) => {
        const { updateclassname, updateclassbrief } = values
        if (!updateclassname || !updateclassbrief) return
        const payload = {
          id: this.state.updateClass._id,
          name: updateclassname,
          brief: updateclassbrief
        }
        dispatch({ type: 'myclass/post', payload })
      })
    }
    const selectTerm = (values) => {
      this.setState({ currentTerm: values })
    }
    const selectCourse = (values) => {
      this.setState({ currentCourse: values })
    }
    return (
      <div>
        <Button
          onClick={() => { dispatch({ type: 'myclass/openModal' }) }}
          type='primary'
          style={{ marginBottom: 12 }}
        >添加班级</Button>
        <Alert message='我的班级' />
        <br />
        <Modal
          title='添加班级'
          wrapClassName='vertical-center-modal'
          style={{ top: 20 }}
          visible={showModal}
          onOk={putNewClass}
          onCancel={() => { dispatch({ type: 'myclass/hideModal' }) }}
          confirmLoading={loading}
        >
          <Form layout='horizontal'>
            <Select onChange={selectTerm} placeholder='选择学期' style={{ marginBottom: 10 }}>
              {termList.map(t => (
                <Option key={t} value={t}>{t}</Option>
              ))}
            </Select>
            <Select onChange={selectCourse} placeholder='选择课程'>
              {courseList.map(c => (
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))}
            </Select>
            <FormItem label='名称：' hasFeedback>
              {getFieldDecorator('classname', {
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
              {getFieldDecorator('classbrief', {
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
          onCancel={() => { dispatch({ type: 'myclass/hideUpdateModal' }) }}
          confirmLoading={loading}
        >
          <Form layout='horizontal'>
            <FormItem label='名称：' hasFeedback>
              {getFieldDecorator('updateclassname', {
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
              {getFieldDecorator('updateclassbrief', {
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
            <Row gutter={36}>
              {classList.map(c => (
                <Col key={c._id} lg={8} style={{ marginBottom: 12 }}>
                  <Card
                    title={c.name}
                    extra={
                      <Popconfirm onConfirm={() => deleteClass(c._id)} placement='left' title='确定删除吗？' okText='确定' cancelText='取消'>
                        <a>删除</a>
                      </Popconfirm>
                    }
                  >
                    <p>学期：{c.term}</p>
                    <p>课程：{courseList.find(l => l._id === c.refCourse).name}</p>
                    <p>简介：{c.brief}</p>
                    <p>学生总数：{c.refStudents.length}</p>
                    <Button onClick={() => openUpdateModal(c)} style={{ float: 'right', marginBottom: 10, marginRight: -15 }}>修改</Button>
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

export default connect(({ myclass, loading }) => ({ myclass, loading: loading.global }))(Form.create()(myClass))
