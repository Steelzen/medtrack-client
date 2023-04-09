import { useState, useEffect } from "react";
import { Layout, Breadcrumb, Spin, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MainContent = () => {
  const [patients, setPatients] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [details, setDetails] = useState([]);

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
  );
};

export default MainContent;
