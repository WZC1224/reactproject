import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Dropdown, Avatar, message } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DashboardOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/layout/MainLayout.module.css';
import logoImage from '../../assets/logo.png';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string; avatar?: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { token: { colorBgContainer } } = theme.useToken();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch (error) {
        // localStorage.removeItem('token');
        // navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const routeKey = location.pathname.split('/')[1];
    const currentRoute = menuItems.find(item => item.key === routeKey);
    const title = currentRoute ? `${currentRoute.label} - 后台管理系统` : '未知页面 - 后台管理系统';
    document.title = title;
  }, [location]);

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
          <img src={logoImage} alt="" style={{width: '32px',height: '32px'}} />
          <span className={collapsed ? styles.logoTextHidden : ''}>个人系统</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname.split('/')[1]]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{width: collapsed ? 'calc(100vw - 80px)' : 'calc(100vw - 200px)'}}>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          <div style={{display: 'flex'}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed)
            })}
            <span className={styles.routeName}>{menuItems.find(item => `/${item.key}` === location.pathname)?.label}</span>
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