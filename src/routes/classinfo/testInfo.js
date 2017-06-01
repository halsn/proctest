/* global window */
import React from 'react'
import { connect } from 'dva'
import { Table, Spin, Alert, Icon, Button, Rate, Collapse, DatePicker, Row, Col, Select } from 'antd'
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
    uuid: ''
  }
  render() {
    const { dispatch, testinfo, loading } = this.props
    const { testList, test } = testinfo
    const { stage, refStudents } = test
    var students = refStudents || []
    var unCheckedStudents = refStudents || []
    if (students.length) {
      students = students.map(s => ({
        name: s.name,
        sno: s.sno,
        score: Math.round((s.refQuizs.map(q => q.score).reduce((p, c) => p + c) / (s.refQuizs.length * 10)) * 100)
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
    const inRange = (from, to) => {
      return (n) => {
        if (n >= from && n <= to) return true
        else return false
      }
    }
    const data = [
      {
        range: '0-10',
        人数: students.filter(s => inRange(0, 10)(s.score)).length
      }, {
        range: '11-20',
        人数: students.filter(s => inRange(11, 20)(s.score)).length
      }, {
        range: '21-30',
        人数: students.filter(s => inRange(21, 30)(s.score)).length
      }, {
        range: '31-40',
        人数: students.filter(s => inRange(31, 40)(s.score)).length
      }, {
        range: '41-50',
        人数: students.filter(s => inRange(41, 50)(s.score)).length
      }, {
        range: '51-60',
        人数: students.filter(s => inRange(51, 60)(s.score)).length
      }, {
        range: '61-70',
        人数: students.filter(s => inRange(61, 70)(s.score)).length
      }, {
        range: '71-80',
        人数: students.filter(s => inRange(71, 80)(s.score)).length
      }, {
        range: '81-90',
        人数: students.filter(s => inRange(81, 90)(s.score)).length
      }, {
        range: '91-100',
        人数: students.filter(s => inRange(91, 100)(s.score)).length
      }
    ]
    const columns = [
      {
        title: '学号',
        dataIndex: 'sno'
      }, {
        title: '姓名',
        dataIndex: 'name'
      }, {
        title: '得分',
        dataIndex: 'score'
      }
    ]
    const select = (
      <div>
        <Col lg={24} style={{ marginBottom: 10 }}>
          <DatePicker onChange={updateDate} />
        </Col>
        <Col style={{ marginTop: 10 }}>
          <Select value={this.state.uuid ? this.state.uuid : <span style={{ color: '#d5d5d5' }}>选择测试</span>} onChange={updateTestId} style={{ width: 164, marginRight: 10 }}>
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
                <Table title={() => <p style={{ textAlign: 'center', fontSize: 16 }}>测试结果</p>} pagination={{ pageSize: 5 }} rowKey={record => record.sno} columns={columns} dataSource={students} />
              </Col>
              <Col>
                <Completed data={data} />
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
