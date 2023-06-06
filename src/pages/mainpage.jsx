import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect, useRef, createContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Layout, Menu, theme, Col, Row, Avatar } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  PicLeftOutlined,
} from "@ant-design/icons";
import MedTrackLogo from "../images/MedTrack_Logo.png";
import {
  fetchAllUserDoc,
  fetachAllMedistaffDoc,
  fetchAllPatientDoc,
} from "../common/fetchData";
import create from "@ant-design/icons/lib/components/IconFont";

const { Header, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

export const MainContext = createContext();

const MainPage = () => {
  const [userID, setUserID] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  // Medistaff only
  const [role, setRole] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [organisation, setOrganisation] = useState("");

  const navigate = useNavigate();
  let auth = getAuth();

  useEffect(() => {
    const checkCurrentUser = async () => {
      auth = await getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is logged in, stay on the home page
          // You can perform any additional actions or set states here
        } else {
          // User is not logged in, redirect to the login page
          navigate("/login");
        }
      });
    };

    checkCurrentUser();

    const fetchData = async () => {
      let userID = "";
      let userDoc = [];

      try {
        await new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              userID = user.uid;
              setEmail(user.email);
            } else {
              setEmail("");
            }
            resolve(); // Resolve the Promise once the auth state has been handled
          });
          unsubscribe();
        });

        userDoc = await fetchAllUserDoc();

        userDoc.forEach((doc) => {
          if (doc["user_id"] === userID) {
            setUserID(doc["user_id"]);
            setFirstName(doc["first_name"]);
            setLastName(doc["last_name"]);
            setPosition(doc["position"]);
            setDateOfBirth(doc["date_of_birth"]);
            setAddress(doc["address"]);
            setCity(doc["city"]);
            setState(doc["state"]);
            setZip(doc["zip"]);
            setPhone(doc["phone"]);
            setRole(doc["role"]);
            setLicenseNumber(doc["license_number"]);
            setOrganisation(doc["organisation"]);
          }
        });
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async (e) => {
    console.log("Logout");
    await auth.signOut();
    navigate("/login");
  };

  return (
    <MainContext.Provider
      value={{
        userID,
        email,
        firstName,
        lastName,
        position,
        dateOfBirth,
        address,
        city,
        state,
        zip,
        phone,
        role,
        licenseNumber,
        organisation,
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="logo" />
          <Row>
            <Col span={6} className="logo-container">
              <div className="logo" theme="dark">
                <a href="/home">
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
                      <span>{" " + email}</span>
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
                <Link to="/home/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<DesktopOutlined />}>
                <Link to="/home/medication">Medication</Link>
              </Menu.Item>
              {position === "M" ? (
                <Menu.Item key="4" icon={<TeamOutlined />}>
                  <Link to="/home/management">Management</Link>
                </Menu.Item>
              ) : null}
              <Menu.Item key="7" icon={<FileOutlined />}>
                <Link to="/home/advice">Advice</Link>
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
              <Outlet />
            </div>

            <Footer style={{ textAlign: "center" }}>
              ©2023 Created by Taehyung Kwon
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </MainContext.Provider>
  );
};

export default MainPage;
