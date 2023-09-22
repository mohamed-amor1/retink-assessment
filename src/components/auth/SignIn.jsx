import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const [form] = Form.useForm();

  const [loginStatus, setLoginStatus] = useState(null);

  const onFinish = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoginStatus("success");
        message.success("Login successful");
      })
      .catch((error) => {
        console.error(error);
        setLoginStatus("fail");
        message.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Log In</h1>
        <Form
          name="signin"
          form={form}
          style={{
            maxWidth: "none",
            padding: "0",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input style={{ width: "280px" }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
