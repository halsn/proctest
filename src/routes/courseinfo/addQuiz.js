/* global FileReader */
import React from 'react'
import * as XLSX from 'ts-xlsx'
import { connect } from 'dva'
import { Spin, Select, Row, Col, Upload, Button, Icon, Table } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

const addQuiz = ({ loading, addquiz, dispatch }) => {
  const { sheetData, quizs, courseList, selectCourse } = addquiz
  const read = file => {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = e => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const first_sheet_name = workbook.SheetNames[0]
      const first_sheet = workbook.Sheets[first_sheet_name]
      //用于过滤重复题目
      const filterBump = []
      const sheetData = XLSX.utils.sheet_to_json(first_sheet).filter(el => {
        if (filterBump.indexOf(el.题目) !== -1) return false
        else if (el.类型 === '问答题') {
          el.选项 = ''
          filterBump.push(el.题目.trim())
          return !!(el.题目 && el.参考答案)
        } else if (el.类型 === '判断题') {
          filterBump.push(el.题目.trim())
          if (!el.参考答案) return false
          else if (el.参考答案 === '正确' || el.参考答案 === '错误') return true
          return false
        } else if (el.类型 === '单选题' || el.类型 === '多选题') {
          filterBump.push(el.题目.trim())
          if (!el.选项) return false
          const selection = el.选项
            .split(/;|\n/)
            .map(s => s.trim().replace(/&#10/g, ''))
            .filter(el => /^[A-Z]\.[^.]/.test(el) && el.match(/[A-Z]\./g).length === 1)
          if (selection.length < 2) return false
          el.选项 = selection.join(';')
          const pre = !!(el.题目 && el.参考答案)
          if (pre) return /^[A-Z]+$/.test(el.参考答案) && el.参考答案.split('').length <= selection.length
          return pre
        } else return false
      })
      const source = sheetData.map((el, idx) => ({
        key: idx,
        genre: el.类型,
        describe: el.题目,
        selections: el.选项,
        answers: el.参考答案
      }))
      dispatch({ type: 'addquiz/changeSheetDate', sheetData })
      dispatch({ type: 'addquiz/readFile', quizs: source })
    }
    return false
  }
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
  const put = () => {
    if (!quizs.length || !selectCourse) return
    dispatch({ type: 'addquiz/put', payload: { sheetData, selectCourse } })
  }
  const change = (values) => {
    dispatch({ type: 'addquiz/change', selectCourse: values })
  }
  return (
    <div>
      <Row type='flex'>
        <Col style={{ width: 134 }}>
          <Upload beforeUpload={read} showUploadList accept='.xlsx'>
            <Button>
              <Icon type='upload' />点击选择文件
            </Button>
          </Upload>
          <Select onChange={change} style={{ width: 120, marginTop: 10 }} placeholder='选择课程'>
            {courseList.map(c => (
              <Option key={c._id} value={c._id}>{c.name}</Option>
            ))}
          </Select>
        </Col>
        <Col style={{ width: 60 }}>
          <Button onClick={put} type='primary'>录入</Button>
        </Col>
      </Row>
      <Row>
        <Col lg={24}>
          <div>
            <Spin spinning={loading}>
              <Table
                columns={columns}
                scroll={{ x: 1200 }}
                dataSource={quizs}
              />
            </Spin>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({ addquiz, loading }) => ({ addquiz, loading: loading.global }))(didmount(addQuiz))
