import { useState, useEffect, useContext } from "react";
import { Layout, Breadcrumb, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import MedTrackLogo from "../images/MedTrack_Logo3.png";
import { MainContext } from "../pages/mainpage";

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MainContent = () => {
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState([]);
  const { email, firstName, position } = useContext(MainContext);

  return (
    <Content style={{ margin: "0 16px" }}>
      <h3>Welcome, {firstName} </h3>
      {position === "P" ? <h3>Patient Ch</h3> : <h3>MediStaff Ch</h3>}
      <img className="main-page-logo" src={MedTrackLogo} alt="logo" />
    </Content>
  );
};

export default MainContent;
