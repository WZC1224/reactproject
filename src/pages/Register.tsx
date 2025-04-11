import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/pages/Login.module.css';

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: RegisterForm) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    // 这里模拟注册，实际项目中应该调用后端API
    localStorage.setItem('registeredUser', JSON.stringify({
      username: values.username,
      password: values.password
    }));
    message.success('注册成功');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>用户注册</h2>
        <Form
          name="register"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: '请确认密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              注册
            </Button>
          </Form.Item>
          
          <Form.Item>
            <Link to="/login">已有账号？返回登录</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;