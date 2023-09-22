import React, { useState } from "react";
import { Button, Form, Input, message, Upload, Avatar } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import { UserOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [form] = Form.useForm();
  const [signupStatus, setSignupStatus] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [displayName, setDisplayName] = useState("");

  const onFinish = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      console.log(values.fullName);

      // Update user profile
      await updateProfile(user, {
        displayName: values.fullName,
        photoURL: avatarUrl,
      });

      // Set displayName in component state
      setDisplayName(values.fullName);

      // Upload avatar if it exists
      if (avatarUrl) {
        const avatarRef = storage.ref(`avatars/${user.uid}`);
        await avatarRef.putString(avatarUrl, "data_url");
      }

      // Set signup success status
      setSignupStatus("success");
      message.success(`Sign up successful!`);
    } catch (error) {
      console.error("Sign up error:", error);
      setSignupStatus("fail");
      message.error("Sign up failed. Please try again.");
    }
  };

  const handleAvatarUpload = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      setAvatarUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div style={{ height: "100%" }}>
      <div>
        <h1>Sign Up</h1>
        <Form
          name="signup"
          form={form}
          style={{ maxWidth: "none" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input style={{ width: "280px" }} />
          </Form.Item>

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
            validateFirst
            rules={[
              {
                required: true,
                min: 6,
                message: "Password should be at least 6 characters.",
              },
            ]}
          >
            <Input.Password
              style={{ width: "280px" }}
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item label="Upload Avatar">
            <Upload
              showUploadList={false}
              customRequest={({ file }) => handleAvatarUpload(file)}
            >
              {avatarUrl ? (
                <Avatar src={avatarUrl} size={64} />
              ) : (
                <Avatar icon={<UserOutlined />} size={64} />
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: "10px" }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        {signupStatus && (
          <div style={{ color: signupStatus === "success" ? "green" : "red" }}>
            {signupStatus === "success"
              ? `Sign up successful! `
              : "Sign up failed. Please try again."}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
