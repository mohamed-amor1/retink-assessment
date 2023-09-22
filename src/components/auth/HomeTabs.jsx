import React from "react";
import { Tabs } from "antd";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: "Login",
    children: <SignIn />,
  },
  {
    key: "2",
    label: "Sign Up",
    children: <SignUp />,
  },
];
const HomeTabs = () => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    centered
    size="large"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
      height: "80vh",
      width: "100vw",
      textAlign: "center",
    }}
  />
);

export default HomeTabs;
