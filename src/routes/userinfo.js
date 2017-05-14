import React from 'react'
import { Row, Col, Card } from 'antd'
import styles from './userinfo.less'
import { didmount, color } from '../utils'
import NumberCard from '../components/userinfo/numberCard'

//const bodyStyle = {
  //bodyStyle: {
    //height: 432,
    //background: '#fff'
  //}
//};

const Userinfo = () => {
  const numberCardProps = {
    icon: 'home',
    color: 'pink',
    title: '课程总数',
    number: 2
  }
  return (
    <Row gutter={24}>
      <Col lg={12} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card
              bordered={false}
              className={styles.weather}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.blue
              }}
            >
              <NumberCard />
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card
              bordered={false}
              className={styles.quote}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.peach
              }}
            >
              <NumberCard {...numberCardProps} />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Row gutter={24}>
          <Col lg={24} md={12}>
            <Card
              bordered={false}
              className={styles.weather}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.blue
              }}
            >
              <NumberCard />
            </Card>
          </Col>
          <Col lg={24} md={12}>
            <Card
              bordered={false}
              className={styles.quote}
              bodyStyle={{
                padding: 0,
                height: 204,
                background: color.peach
              }}
            >
              <NumberCard {...numberCardProps} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default didmount(Userinfo)
