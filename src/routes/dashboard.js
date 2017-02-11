import React from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import functional from 'react-functional';
import styles from './dashboard.less';
import { color } from '../utils';

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff'
  }
};

function Dashboard() {
  return (
    <Row gutter={24}>
      <Col lg={18} md={24}>
        <Card
          bordered={false}
          bodyStyle={{
            padding: '24px 36px 24px 0'
          }}
        >
        </Card>
      </Col>
      <Col lg={6} md={24}>
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
            </Card>
          </Col>
        </Row>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
        </Card>
      </Col>
      <Col lg={12} md={24}>
        <Card bordered={false} {...bodyStyle}>
        </Card>
      </Col>
      <Col lg={24} md={24}>
        <Card
          bordered={false}
          bodyStyle={{
            padding: '24px 36px 24px 0'
          }}
        >
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} {...bodyStyle}>
        </Card>
      </Col>
      <Col lg={8} md={24}>
        <Card bordered={false} bodyStyle={{ ...bodyStyle.bodyStyle, padding: 0 }}>
        </Card>
      </Col>
    </Row>
  );
}

Dashboard.propTypes = {};
Dashboard.componentDidMount = () => NProgress.done();
Dashboard.shouldComponentUpdate = () => NProgress.done();

export default connect(({ dashboard }) => ({ dashboard }))(functional(Dashboard));
