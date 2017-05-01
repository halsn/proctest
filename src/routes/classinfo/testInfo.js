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
    const { stage, refStudents } = test
    var students = refStudents || []
    var unCheckedStudents = refStudents || []
    if (students.length) {
      students = students.map(s => ({
        name: s.name,
        sno: s.sno,
        score: s.refQuizs.map(q => q.score).reduce((p, c) => p + c)
      }))
    }
    if (unCheckedStudents.length) {
      unCheckedStudents = unCheckedStudents.filter(s => !s.isChecked)
    }
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
    const postCheck = () => {
      const askQuizs = test.refStudents.map(s => s.refQuizs).reduce((p, c) => [...p, ...c]).filter(q => q.genre === '问答题')
      if (askQuizs.every(q => q.score !== 0)) {
        dispatch({ type: 'testinfo/putCheck', payload: { test } })
      }
    }
    const updateRate = (sno, qIdx, v) => {
      const sIdx = test.refStudents.findIndex(s => s.sno === sno)
      test.refStudents[sIdx].refQuizs[qIdx].score = v * 2
    }
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
                <Button onClick={postCheck} type='primary'>提交</Button>
              </Col>
              <Col lg={24}>
                {unCheckedStudents.map(s => (
                  <Collapse key={s.no} bordered={false}>
                    <Panel header={s.name + '-' + s.sno} key={s.no}>
                      {s.refQuizs.map((q, qIdx) => {
                        if (q.genre !== '问答题') return <span key={q._id}>{' '}</span>
                        return (
                          <div key={q._id} style={{ marginBottom: 10 }}>
                            <p>题目：{q.describe.content}</p>
                            <p>参考答案：{q.answers.join('')}</p>
                            <p>提交的答案：{q.answered.join('')}</p>
                            <Rate onChange={(v) => updateRate(s.sno, qIdx, v)} character={<Icon type='like' />} />
                          </div>
                        )
                      })}
                    </Panel>
                  </Collapse>
                ))}
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
                {students.map(s => (
                  <Collapse key={s.no} bordered={false}>
                    <Panel header={s.name + '-' + s.sno} key={s.no}>
                      <p>总得分：{s.score}</p>
                    </Panel>
                  </Collapse>
                ))}
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
