import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
// import { color } from '../../utils'
import styles from './completed.less'

function Completed(props) {
  const { data } = props
  return (
    <div className={styles.sales}>
      <div className={styles.title}>分数分布图</div>
      <ResponsiveContainer minHeight={360}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5 }}
        >
          <XAxis dataKey='range' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Bar dataKey='人数' fill='#8884d8' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Completed
