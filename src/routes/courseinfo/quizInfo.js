import React from 'react'
import { connect } from 'dva'
import { Spin, Button, Table, Row, Col, Select } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

class quizInfo extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    courseId: ''
  }
  render() {
    const { quizinfo, loading, dispatch } = this.props
    const { courseList, quizList } = quizinfo
    const dataSource = quizList.map(q => ({
      key: q._id,
      genre: q.genre,
      describe: q.describe.content,
      selections: q.selections.join('， '),
      answers: q.answers.join('， ')
    }))
    const columns = [
      {
        title: '题型',
        dataIndex: 'genre',
        key: 'genre',
        width: '10%'
      }, {
        title: '题目',
        dataIndex: 'describe',
        key: 'describe',
        width: '40%'
      }, {
        title: '选项',
        dataIndex: 'selections',
        key: 'selections',
        width: '25%'
      }, {
        title: '参考答案',
        dataIndex: 'answers',
        key: 'answers',
        width: '25%'
      }
    ]
    const get = () => {
      const courseId = this.state.courseId
      if (!courseId) return
      dispatch({ type: 'quizinfo/get', payload: { courseId } })
    }
    const change = (values) => {
      this.setState({ courseId: values })
    }
    return (
      <div>
        <Row>
          <Col>
            <Select
              onChange={change}
              style={{ width: 192 }}
              placeholder='选择课程'
            >
              {courseList.map(c => (
                <Option key={c._id} value={c._id}>{c.name}({c.creater})</Option>
              ))}
            </Select>
            <Button onClick={get} type='primary' style={{ marginLeft: 10 }}>查询</Button>
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <div>
              <Spin spinning={loading}>
                <Table
                  columns={columns}
                  scroll={{ x: 1200 }}
                  dataSource={dataSource}
                />
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ quizinfo, loading }) => ({ quizinfo, loading: loading.global }))(quizInfo)
