/* global FileReader */
import React from 'react'
import * as XLSX from 'ts-xlsx'
import { connect } from 'dva'
import { Alert, Select, Row, Col, Upload, Button, Icon, Table } from 'antd'

const Option = Select.Option

class addStudent extends React.Component {
  render () {
    const { dispatch, addstudent, loading } = this.props
    const { students, classList, selectClass } = addstudent
    const read = file => {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = e => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const first_sheet_name = workbook.SheetNames[0]
        const first_sheet = workbook.Sheets[first_sheet_name]
        // 用于过滤不合法元素以及重复元素
        const filterBump = []
        const sheetData = XLSX.utils.sheet_to_json(first_sheet).filter(el => {
          if (filterBump.indexOf(el.学号) !== -1) return false
          if (!el.姓名 || !el.学号 || !el.专业 || !el.班级) return false
          else {
            filterBump.push(el.学号)
            return true
          }
        })
        const source = sheetData.map((el, idx) => ({
          key: idx,
          name: el.姓名,
          sno: el.学号,
          major: el.专业,
          className: el.班级
        }))
        dispatch({ type: 'addstudent/read', students: source })
      }
      return false
    }
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '10%'
      }, {
        title: '学号',
        dataIndex: 'sno',
        key: 'sno',
        width: '40%'
      }, {
        title: '专业',
        dataIndex: 'major',
        key: 'major',
        width: '25%'
      }, {
        title: '班级',
        dataIndex: 'className',
        key: 'className',
        width: '25%'
      }
    ]
    const post = () => {
      if (!students.length || !selectClass) return
      dispatch({ type: 'addstudent/post', payload: { students, selectClass } })
    }
    const change = (value) => {
      dispatch({ type: 'addstudent/change', selectClass: value })
    }
    return (
      <div>
        <Alert showIcon message={<span>录入格式请参考下载文件，<a href='/student.xlsx'>点击下载文件</a></span>} />
        <br />
        <Alert showIcon type='warning' message='注意：学生名单以最后一次录入为准' />
        <br />
        <Row type='flex'>
          <Col style={{ width: 140 }}>
            <Upload beforeUpload={read} showUploadList accept='.xlsx'>
              <Button>
                <Icon type='upload' />点击选择文件
              </Button>
            </Upload>
          </Col>
          <Col style={{ width: 70 }}>
            <Button loading={loading} onClick={post} type='primary'>录入</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 12 }}>
          <Col>
            <Select
              style={{ width: 198 }}
              placeholder='选择班级'
              onChange={change}
            >
              {classList.map(c => (
                <Option key={c._id} value={c._id}>{c.name}({c.course})</Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <Table
              columns={columns}
              scroll={{ x: 1200 }}
              dataSource={students}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ addstudent, loading }) => ({ addstudent, loading: loading.global }))(addStudent)
