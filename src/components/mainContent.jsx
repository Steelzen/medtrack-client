import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { useState, useEffect, useContext } from "react";
import { Layout, Breadcrumb, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import MedTrackLogo from "../images/MedTrack_Logo3.png";
import { MainContext } from "../pages/mainpage";

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MainContent = () => {
  const [patients, setPatients] = useState([]);
  const [medStaff, setMedStaff] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState([]);
  const { firstName, position } = useContext(MainContext);

  let licenseNumber = "";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:4001/get_document_all/Test/"
      );

      const user = await getAuth().currentUser;
      const email = user.email;

      const medStaff = await axios.get(
        `http://localhost:4001/get_document/medistaff/${email}/`
      );

      console.log("Fetched data:", result.data);
      console.log("Fetched MedStaff:", medStaff.data["license_number"]);

      setDetails(result.data.docs); // Make sure 'docs' is the correct key in the response object
      setMedStaff(medStaff.data);
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
    <Content style={{ margin: "0 16px" }}>
      <h3>Welcome, {firstName} </h3>
      <img className="main-page-logo" src={MedTrackLogo} alt="logo" />
      {details.map((item, index) => (
        <div key={index}>
          <h3>{item["content1"]}</h3>
          <h3>{item["content2"]}</h3>
        </div>
      ))}
    </Content>
  );
};

export default MainContent;
