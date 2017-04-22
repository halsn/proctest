/* global FileReader */
import React from 'react'
import * as XLSX from 'ts-xlsx'
import { Select, Row, Col, Upload, Button, Icon, Table } from 'antd'
import { didmount } from '../../utils'

const Option = Select.Option

class addStudent extends React.Component {
  constructor() {
    super()
    didmount(this)
  }
  state = {
    tableData: []
  }
  render() {
    const { tableData } = this.state
    const read = file => {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = e => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const first_sheet_name = workbook.SheetNames[0]
        const first_sheet = workbook.Sheets[first_sheet_name]
        //用于过滤重复题目
        const sheetData = XLSX.utils.sheet_to_json(first_sheet).filter(el => {
          if (!el.姓名 || !el.学号 || !el.专业 || !el.班级) return false
          else return true
        })
        const source = sheetData.map((el, idx) => ({
          key: idx,
          name: el.姓名,
          sno: el.学号,
          major: el.专业,
          className: el.班级
        }))
        this.setState({ tableData: source })
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
    return (
      <div>
        <Row type='flex'>
          <Col style={{ width: 140 }}>
            <Upload beforeUpload={read} showUploadList accept='.xlsx'>
              <Button>
                <Icon type='upload' />点击选择文件
              </Button>
            </Upload>
          </Col>
          <Col style={{ width: 70 }}>
            <Button type='primary'>录入</Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 12 }}>
          <Col>
            <Select
              showSearch
              style={{ width: 140 }}
              placeholder='选择班级'
            >
              <Option value='jack'>特别特别长的名字呢个？？？？？？</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='tom'>Tom</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col lg={24}>
            <Table
              columns={columns}
              scroll={{ x: 1200 }}
              dataSource={tableData}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default addStudent
