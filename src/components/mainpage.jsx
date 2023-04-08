import { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import MainContent from "./mainContent";

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="top-menu-wrapper">
          <div className="logo" theme="dark" href="http://localhost:3000">
            <a href="http://localhost:3000">MedTrack</a>
          </div>
          <div className="top-menu-middle-divider" theme="dark"></div>
          <Menu
            className="top-menu"
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
          >
            <Menu.Item key="10">Sign Up</Menu.Item>
            <Menu.Item key="11">Login</Menu.Item>
            <Menu.Item key="12">Logout</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              Mediation
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              User
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Patients">
              <Menu.Item key="5">Tom</Menu.Item>
              <Menu.Item key="6">Bill</Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<FileOutlined />}>
              Advice
            </Menu.Item>
            <Menu.Item key="8" icon={<NotificationOutlined />}>
              Communication
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <MainContent />
          <Footer style={{ textAlign: "center" }}>
            ©2023 Created by Taehyung Kwon
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
