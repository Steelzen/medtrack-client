import { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Table, Spin, Empty, theme } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MainPage = () => {
  const [patients, setPatients] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:4001/get_document_all/Test/"
      );
      console.log("Fetched data:", result.data);
      setDetails(result.data.docs); // Make sure 'docs' is the correct key in the response object
    };

    fetchData();
  }, []);

  const renderPatients = () => {
    if (fetching) {
      return <Spin indicator={antIcon} />;
    }
    if (patients.length <= 0) {
      return <Empty />;
    }
    return patients;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="horizontal">
          <Menu.Item key="10">Sign Up</Menu.Item>
          <Menu.Item key="11">Login</Menu.Item>
          <Menu.Item key="12">Logout</Menu.Item>
        </Menu>
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
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <p>This is testing for fetching data</p>
              {details.map((item, index) => (
                <div key={index}>
                  <h3>{item["content1"]}</h3>
                  <h3>{item["content2"]}</h3>
                </div>
              ))}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2023 Created by Taehyung Kwon
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainPage;
