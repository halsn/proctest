/* global localStorage document window */
import React from 'react'
import { connect } from 'dva'
import { Spin, Alert, Icon, Button, Rate, Collapse, DatePicker, Row, Col, Select } from 'antd'
// import Mock from 'mockjs'
// import Completed from '../../components/userinfo/completed.js'
import { didmount } from '../../utils'

const Option = Select.Option
const Panel = Collapse.Panel

class testInfo extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    uuid: ''
  }
  render() {
    // const { data } = Mock.mock({
      // 'data|10-20': [
        // {
          // 'name|+1': 2008,
          // 'Task complete|200-1000': 1,
          // 'Cards Complete|200-1000': 1
        // }
      // ]
    // })
    const { dispatch, testinfo, loading } = this.props
    const { testList, test } = testinfo
    const { stage } = test
    const updateDate = (value) => {
      this.setState({ uuid: '' })
      if (!value) dispatch({ type: 'testinfo/resetList' })
      else dispatch({ type: 'testinfo/get', payload: { searchDate: value.valueOf() } })
    }
    const updateTestId = (value) => {
      this.setState({ uuid: value })
    }
    const getTest = () => {
      const { uuid } = this.state
      if (!uuid) return
      dispatch({ type: 'testinfo/getTest', payload: { uuid } })
      this.setState({ uuid: '' })
    }
    const testURL = `http://${window.location.host}/test?uuid=${this.state.uuid}`
    const qrURL = `http://${window.location.host}/api/qr?url=${testURL}`
    const select = (
      <div>
        <Col lg={24}>
          <DatePicker onChange={updateDate} />
        </Col>
        <Col style={{ marginTop: 10 }}>
          <Select value={this.state.uuid} onChange={updateTestId} style={{ width: 164, marginRight: 10 }} placeholder='选择测试'>
            {testList.map(t => (
              <Option key={t.uuid} value={t.uuid}>{t.createAt}</Option>
            ))}
          </Select>
          <Button onClick={getTest} type='primary'>查询</Button>
        </Col>
        <Col style={{ marginTop: 10 }}>
          <Alert
            message={
              <div>
                <p>测试链接：{testURL}</p>
                <p>链接二维码：<a rel='noopener noreferrer' target='_blank' href={qrURL}><Icon type='qrcode' /></a></p>
              </div>
            }
          />
        </Col>
      </div>
    )
    if (stage === 'inAnswer') {
      return (
        <div>
          <Spin spinning={loading}>
            <Row gutter={24}>
              {select}
              <Col style={{ marginTop: 10 }}>
                <Alert message='当前阶段：学生答题中' />
              </Col>
            </Row>
          </Spin>
        </div>
      )
    } else if (stage === 'inCorrect') {
      return (
        <div>
          <Spin spinning={loading}>
            <Row gutter={24}>
              {select}
              <Col style={{ marginTop: 10 }}>
                <Alert message='当前阶段：学生批改中' />
              </Col>
            </Row>
          </Spin>
        </div>
      )
    } else if (stage === 'inCheck') {
      return (
        <div>
          <Spin spinning={loading}>
            <Row gutter={24}>
              {select}
              <Col style={{ marginTop: 10 }}>
                <Alert message='当前阶段：确认未批改习题' />
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
            </Row>
          </Spin>
        </div>
      )
    } else if (stage === 'inFinished') {
      return (
        <div>
          <Spin spinning={loading}>
            <Row gutter={24}>
              {select}
              <Col style={{ marginTop: 10 }}>
                <Alert message='当前阶段：测试结束' />
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
            </Row>
          </Spin>
        </div>
      )
    } else {
      return (
        <div>
          <Spin spinning={loading}>
            {select}
          </Spin>
        </div>
      )
    }
  }
}

export default connect(({ testinfo, loading }) => ({ testinfo, loading: loading.global }))(testInfo)
