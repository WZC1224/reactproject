import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/pages/Login.module.css';

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: LoginForm) => {
    // 这里模拟登录验证，实际项目中应该调用后端API
    const registeredUser = localStorage.getItem('registeredUser');
    const isAdmin = values.username === 'admin' && values.password === 'admin';
    const isRegisteredUser = registeredUser && JSON.parse(registeredUser).username === values.username && 
                           JSON.parse(registeredUser).password === values.password;

    if (isAdmin || isRegisteredUser) {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('user', JSON.stringify({
        name: isAdmin ? 'Admin' : values.username,
        role: isAdmin ? 'admin' : 'user',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
      }));
      message.success('登录成功');
      navigate('/dashboard');
    } else {
      message.error('用户名或密码错误');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.title}>后台管理系统</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名: admin"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码: admin"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
          
          <Form.Item>
            <Link to="/register">还没有账号？立即注册</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;