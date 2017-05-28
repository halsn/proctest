import React from 'react'
import { Table, Tag } from 'antd'
import moment from 'moment'
import styles from './recent.less'
import { color } from '../../utils'

const status = {
  1: {
    color: color.blue,
    text: '学生答题中'
  },
  2: {
    color: color.yellow,
    text: '学生批改中'
  },
  3: {
    color: color.red,
    text: '待老师批改'
  },
  4: {
    color: color.green,
    text: '测试以结束'
  }
}

function Recent(props) {
  const { data } = props
  const columns = [
    {
      title: '时间',
      dataIndex: 'date',
      render: date => moment(date).locale('zh-cn').format('MMM Do h:mm:ss')
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => <Tag color={status[text].color}>{status[text].text}</Tag>
    }, {
      title: '所属班级',
      dataIndex: 'class'
    }
  ]
  return (
    <div className={styles.recentsales}>
      <Table title={() => <p style={{ textAlign: 'center', fontSize: 16 }}>最新测试信息</p>} pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={data} />
    </div>
  )
}

export default Recent
