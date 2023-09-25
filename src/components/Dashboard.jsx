import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Button, Col, Input, Row, Avatar } from "antd";
import {
  CalendarOutlined,
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
  EditOutlined,
  RiseOutlined,
  FormOutlined,
  SnippetsOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";
import "./Dashboard.css";
import { auth } from "../firebase";

import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Import Firebase Storage functions

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ displayName }) => {
  const isLoggedIn = !!auth.currentUser;
  const [avatarURL, setAvatarURL] = useState(null); // State to store the avatar URL

  const headerStyle = {
    textAlign: "left",
    alignItems: "left",
    background: "#f1edfd",
    margin: 0, // Add this line
    padding: 0, // Add this line
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  };

  const contentStyle = {
    textAlign: "left",
    height: "100%",
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    margin: "0",
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Move the retrieval of the avatar URL into an effect
  useEffect(() => {
    const getAvatarUrl = async () => {
      try {
        const userUid = auth.currentUser.uid;
        const avatarRef = ref(getStorage(), `avatars/${userUid}/avatar.jpg`);
        const avatarURL = await getDownloadURL(avatarRef);
        setAvatarURL(avatarURL);
      } catch (error) {
        console.error("Error getting avatar URL:", error);
      }
    };

    if (isLoggedIn) {
      getAvatarUrl();
    }
  }, [isLoggedIn]); // Only run this effect when the login status changes

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        margin: "0",
        padding: "0",
      }}
    >
      <Sider
        width={100}
        style={{
          margin: "0",
          padding: "0",
        }}
        theme="light"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: "50%",
              height: "auto",
              marginBottom: "20px",
              top: "0",
            }}
          />
          <Menu
            mode="vertical"
            defaultSelectedKeys={["1"]}
            style={{ width: "100%" }}
            inlineIndent="0"
          >
            <Menu.Item
              key="1"
              icon={
                <HomeOutlined
                  style={{
                    padding: "0",
                    margin: "0 auto",
                    alignItems: "center",
                    fontSize: "20px",
                  }}
                />
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                margin: "0 auto",
                marginBottom: "40vh",
              }}
            />

            <Menu.Item
              key="3"
              icon={
                <SettingOutlined
                  style={{
                    fontSize: "20px",
                    padding: "0",
                    margin: "0",
                    alignItems: "center",
                  }}
                />
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                marginBottom: "20vh",
              }}
            />
            <Menu.Item
              key="4"
              icon={
                <LogoutOutlined
                  style={{
                    fontSize: "20px",
                    padding: "0",
                    margin: "0",
                    alignItems: "center",
                  }}
                />
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              onClick={handleLogout}
            />
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={headerStyle}>
          <Row
            justify="space-between"
            align="middle"
            style={{
              marginLeft: 0,
              padding: 0,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
            }}
            className="first-col"
          >
            <Col span={10}>
              <Input
                placeholder="Search for templates, projects, etc"
                size="large"
                allowClear
                style={{
                  marginRight: "10px",
                  marginLeft: 10,
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                }}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Col>
            <Col span={10}>
              <Button id="create-btn-1" size="large">
                Create Content
              </Button>
            </Col>

            <Col>
              <CalendarOutlined className="icon" style={{ fontSize: "30px" }} />
              <BellOutlined className="icon" style={{ fontSize: "30px" }} />
              <Avatar size="large" src={avatarURL} />
            </Col>
          </Row>
        </Header>
        <Content style={contentStyle}>
          <Card
            bordered={false}
            className="dashboard-card"
            style={{
              background: "url('/3.png')",
              width: "100%",
              textAlign: "left",
              boxShadow:
                "  rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px ",
            }}
          >
            <h1
              style={{
                textAlign: "left",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Hey, {displayName ? displayName : "Guest"}!
            </h1>
            <p>Let&apos;s create something awesome today! ✨💫</p>
            <Button id="create-btn">Start Creating</Button>
          </Card>
          <h2>Most Popular Tools</h2>
          <p>Explore the trending tools to create your copies fast</p>
          <div
            className="social-media"
            style={{
              width: "100%",
              margin: "0",
            }}
          >
            <h3>Social media</h3>
            <Row gutter={[16, 16]} style={{ margin: "0", width: "100%" }}>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card bordered={false}>
                  <p
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      fontSize: "20px",
                    }}
                  >
                    <EditOutlined
                      style={{
                        color: "#f5af19",
                      }}
                    />
                    <RiseOutlined />
                  </p>
                  <h3>Blog writing</h3>
                  <p>
                    Generate the best blog post to fit your audience with just a
                    few clicks of a button
                  </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card bordered={false}>
                  <p
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      fontSize: "20px",
                    }}
                  >
                    <FormOutlined
                      style={{
                        color: "#11FFBD",
                      }}
                    />
                    <RiseOutlined />
                  </p>
                  <h3>Product descriptions</h3>
                  <p>
                    Instanstly generate engaging product descriptions that sell
                  </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card bordered={false}>
                  <p
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      fontSize: "20px",
                    }}
                  >
                    <SnippetsOutlined
                      style={{
                        color: "#bc4e9c",
                      }}
                    />
                    <RiseOutlined />
                  </p>
                  <h3>Article writer</h3>
                  <p>
                    Automatically create unique factual articles at the touch of
                    a button
                  </p>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={6}>
                <Card bordered={false}>
                  <p
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                      fontSize: "20px",
                    }}
                  >
                    <EditOutlined
                      style={{
                        color: "#f5af19",
                      }}
                    />
                    <RiseOutlined />
                  </p>
                  <h3>Blog writing</h3>
                  <p>
                    Generate the best blog post to fit your audience with just a
                    few clicks of a button
                  </p>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "white" }}>
          Retink! 2023. All rights reserved. ©
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
