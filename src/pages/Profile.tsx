import React, { useState, useEffect } from 'react';
import { Card, Avatar, Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../styles/pages/Profile.module.css';

interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      form.setFieldsValue(userData);
    }
  }, [form]);

  const handleSubmit = (values: UserInfo) => {
    const updatedUser = { ...values };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    message.success('个人信息更新成功');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Card title="个人中心" className={styles.card}>
        <div className={styles.avatarSection}>
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={user.avatar}
            className={styles.avatar}
          />
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="头像链接"
            name="avatar"
          >
            <Input placeholder="请输入头像链接" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;