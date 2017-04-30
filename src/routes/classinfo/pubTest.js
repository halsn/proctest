import React from 'react'
import is from 'is_js'
import { connect } from 'dva'
import { DatePicker, Alert, Spin, Slider, Button, Row, Col, Select } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

class pubTest extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    singleNum: 0,
    multiNum: 0,
    judgeNum: 0,
    askNum: 0,
    correctNum: 0,
    answerTime: 0,
    expireTime: 0,
    curClass: null,
    postAt: null
  }
  render() {
    var { curClass, singleNum, multiNum, judgeNum, askNum, answerTime, expireTime } = this.state
    const { pubtest, dispatch, loading } = this.props
    const { studentsCount, classList, maxSingleNum, maxMultiNum, maxJudgeNum, maxAskNum } = pubtest
    const get = (value) => {
      if (!value) return
      dispatch({ type: 'pubtest/get', payload: { classId: value } })
      this.setState({
        singleNum: 0,
        multiNum: 0,
        judgeNum: 0,
        askNum: 0,
        correctNum: 0,
        answerTime: 0,
        expireTime: 0,
        curClass: value
      })
    }
    const updateAns = (value) => {
      this.setState({ answerTime: value })
      if (value === 0) this.setState({ singleNum: 0, multiNum: 0, judgeNum: 0, askNum: 0 })
    }
    const updateExpireTime = (value) => {
      if (!value) return
      this.setState({ expireTime: value.valueOf() })
    }
    const updateSingle = (value) => this.setState({ singleNum: value })
    const updateMulti = (value) => this.setState({ multiNum: value })
    const updateJudge = (value) => this.setState({ judgeNum: value })
    const updateAsk = (value) => {
      this.setState({ askNum: value })
      this.setState({ correctNum: value * 5 })
    }
    const post = () => {
      if (!curClass) return
      if (!answerTime || !expireTime) return
      if (is.any.truthy([singleNum, multiNum, judgeNum, askNum])) {
        this.state.postAt = Date.now()
        dispatch({ type: 'pubtest/put', payload: this.state })
        updateAns(0)
      }
    }
    const disabledStartDate = (value) => {
      return new Date(value).getTime() <= Date.now()
    }
    return (
      <div>
        <Row>
          <Col lg={24}>
            <Select onChange={get} style={{ width: 100, marginRight: 10 }} placeholder='选择班级'>
              {classList.map(c => (
                <Option value={c._id} key={c._id}>{c.name}</Option>
              ))}
            </Select>
            <Button onClick={post} type='primary'>发布</Button>
          </Col>
        </Row>
        <br />
        <Alert showIcon message='注意：为了保证学生批改的质量，每道问答题至少需要两名学生进行批改，因此学生每人批改数量为问答题个数X5' type='warning' />
        <Row gutter={24}>
          <Col>
            <Spin spinning={loading}>
              <Col lg={24} style={{ marginTop: 10 }}>
                <Alert message={`单选题总数：${maxSingleNum}`} />
                <Alert message={`多选题总数：${maxMultiNum}`} />
                <Alert message={`判断题总数：${maxJudgeNum}`} />
                <Alert message={`问答题总数：${maxAskNum}`} />
                <Alert message={`学生总人数：${studentsCount}`} />
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>截至时间：</p>
                <DatePicker
                  format='YYYY-MM-DD HH:mm:ss'
                  showTime
                  disabledDate={disabledStartDate}
                  onChange={updateExpireTime}
                  // onOk={updateExpireTime}
                />
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>答题时长：</p>
                <Slider value={this.state.answerTime} onChange={updateAns} max={60} style={{ flex: 5, maxWidth: 250 }} tipFormatter={val => `${val}m`} />
                <span>{this.state.answerTime}分</span>
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>单选题：</p>
                <Slider disabled={!this.state.answerTime} value={this.state.singleNum} onChange={updateSingle} max={maxSingleNum} style={{ flex: 5, maxWidth: 250 }} />
                <span>{this.state.singleNum}题</span>
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>多选题：</p>
                <Slider disabled={!this.state.answerTime} value={this.state.multiNum} onChange={updateMulti} max={maxMultiNum} style={{ flex: 5, maxWidth: 250 }} />
                <span>{this.state.multiNum}题</span>
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>判断题：</p>
                <Slider disabled={!this.state.answerTime} value={this.state.judgeNum} onChange={updateJudge} max={maxJudgeNum} style={{ flex: 5, maxWidth: 250 }} />
                <span>{this.state.judgeNum}题</span>
              </Col>
              <Col style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <p style={{ width: 80 }}>问答题：</p>
                <Slider disabled={!this.state.answerTime} value={this.state.askNum} onChange={updateAsk} max={maxAskNum} style={{ flex: 5, maxWidth: 250 }} />
                <span>{this.state.askNum}题</span>
              </Col>
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ pubtest, loading }) => ({ pubtest, loading: loading.global }))(pubTest)
