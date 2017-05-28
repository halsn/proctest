import React from 'react'
import { connect } from 'dva'
import ReactAnimatedWeather from 'react-animated-weather'
import { Spin, Row, Col, Card } from 'antd'
import styles from './userinfo.less'
import { didmount, color } from '../utils'
import NumberCard from '../components/userinfo/numberCard'
import Weather from '../components/userinfo/weather'
import Recent from '../components/userinfo/recent'

const Userinfo = ({ loading, userinfo }) => {
  const { quizNum, courseNum, testNum, weatherIcon, temp, weatherName, data } = userinfo
  return (
    <Spin spinning={loading}>
      <Row gutter={24}>
        <Col lg={8} md={8}>
          <NumberCard icon='inbox' color='#64ea91' title='习题总数' number={quizNum} />
        </Col>
        <Col lg={8} md={8}>
          <NumberCard icon='solution' color='#8fc9fb' title='课程总数' number={courseNum} />
        </Col>
        <Col lg={8} md={8}>
          <NumberCard icon='file-text' color='#f69899' title='测试总数' number={testNum} />
        </Col>
        <Col lg={16} md={16}>
          <Card bordered={false}>
            <Recent data={data} />
          </Card>
        </Col>
        <Col lg={8} md={8}>
          <Card
            bordered={false}
            className={styles.weather}
            bodyStyle={{
              padding: 0,
              height: 204,
              background: color.blue
            }}
          >
            <div style={{ position: 'absolute', top: 30, left: 20 }}>
              <ReactAnimatedWeather
                icon={weatherIcon}
                color='#fff'
                size={64}
              />
            </div>
            <Weather city='重庆' temperature={temp} name={weatherName} />
          </Card>
        </Col>
      </Row>
    </Spin>
  )
}

export default connect(({ userinfo, loading }) => ({ userinfo, loading: loading.global }))(didmount(Userinfo))
