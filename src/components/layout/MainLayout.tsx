import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DashboardOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from '../../styles/layout/MainLayout.module.css';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; avatar?: string } | null>(null);
  const navigate = useNavigate();
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [navigate]);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.logo}>
            个人系统
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{width: 'calc(100vw - 200px)'}}>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed)
            })}
          </div>
          <div className={styles.userInfo}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: () => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      message.success('已退出登录');
                      navigate('/login');
                    },
                  },
                ],
              }}
            >
              <div className={styles.userContainer}>
                <Avatar
                  className={styles.avatar}
                  icon={<UserOutlined />}
                  src={user?.avatar}
                />
                <span>{user?.name}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className={styles.content}
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;