import {
  BrowserRouter as Router,
  redirect,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, Menu, theme, Col, Row, Avatar } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import MainContent from "../components/mainContent";
import Advice from "../components/advice";
import MedTrackLogo from "../images/MedTrack_Logo.png";

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const MainPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = (e) => {
    console.log("Logout");
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="logo" />
        <Row>
          <Col span={6} className="logo-container">
            <div className="logo" theme="dark" href="http://localhost:3000">
              <a href="http://localhost:3000/index">
                <img className="logo-img" src={MedTrackLogo} alt="logo" />
              </a>
            </div>
          </Col>
          <Col span={18}>
            <Menu
              className="top-menu"
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="horizontal"
            >
              <SubMenu
                title={
                  <span>
                    <Avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: "#87d068",
                      }}
                    />
                    <span> Username</span>
                  </span>
                }
              >
                <Menu.Item key="4" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              Mediation
            </Menu.Item>
            <SubMenu key="sub1" icon={<TeamOutlined />} title="Patients">
              <Menu.Item key="5">Tom</Menu.Item>
              <Menu.Item key="6">Bill</Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<FileOutlined />}>
              <Link to="/advice">Advice</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<NotificationOutlined />}>
              Communication
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 780 }}
          >
            <Routes>
              <Route exact path="/" element={<MainContent />} />
              <Route path="/advice" element={<Advice />} />
            </Routes>
          </div>
          <Footer style={{ textAlign: "center" }}>
            ©2023 Created by Taehyung Kwon
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
