import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Modal, Form, message } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '正常' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '正常' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      onOk() {
        setUsers(users.filter(user => user.id !== id));
        message.success('删除成功');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        setUsers(users.map(user =>
          user.id === editingId ? { ...values, id: editingId } : user
        ));
        message.success('更新成功');
      } else {
        const newUser = {
          ...values,
          id: users.length + 1,
          status: '正常',
        };
        setUsers([...users, newUser]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingId(null);
    });
  };

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Input
              placeholder="搜索用户"
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => {
                setEditingId(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              添加用户
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editingId ? '编辑用户' : '添加用户'}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={() => {
            setIsModalVisible(false);
            form.resetFields();
            setEditingId(null);
          }}
        >
          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item
              name="name"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="角色"
              rules={[{ required: true, message: '请选择角色' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Users;