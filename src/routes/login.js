import React from 'react'
import { Button, Row, Form, Input, Icon } from 'antd'
import styles from './login.less'

const FormItem = Form.Item

const login = ({
  loading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  },
  dispatch
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      onOk(values)
    })
  }
  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <span>ProcTest</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('useremail', {
            rules: [
              {
                required: true,
                message: '请填写邮箱'
              },
              {
                type: 'email',
                message: '邮箱格式错误'
              }
            ]
          })(<Input style={{ width: 222 }} size='large' addonBefore={<Icon type='mail' />} onPressEnter={handleOk} placeholder='邮箱' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('userpass', {
            rules: [
              {
                required: true,
                message: '请填写密码'
              },
              {
                type: 'string',
                min: 6,
                max: 32,
                message: '密码最少6位'
              }
            ]
          })(<Input size='large' style={{ width: 222 }} addonBefore={<Icon type='lock' />} type='password' onPressEnter={handleOk} placeholder='密码' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk} loading={loading}>
            登录
          </Button>
          <br />
          <br />
          <a href='/forget'>忘记密码?</a>
          <a onClick={() => { dispatch({ type: 'app/showSignup' }) }} style={{ 'float': 'right' }}>注册</a>
        </Row>
      </form>
    </div>
  )
}

export default Form.create()(login)
