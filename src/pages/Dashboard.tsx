import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>系统概览</h2>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单数量"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="文章数量"
              value={56}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="团队人数"
              value={25}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '24px' }}>
        <Col span={12}>
          <Card title="最近活动">
            <p>用户张三登录了系统 - 10分钟前</p>
            <p>新增订单 #12345 - 30分钟前</p>
            <p>系统更新完成 - 2小时前</p>
            <p>新用户注册 - 5小时前</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统公告">
            <p>系统将于本周日进行例行维护</p>
            <p>新版本功能预告</p>
            <p>春节放假通知</p>
            <p>关于系统安全升级的通知</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;