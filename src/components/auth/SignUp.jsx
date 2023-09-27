import React, { useState } from "react";
import { Button, Form, Input, message, Upload, Avatar } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { UserOutlined } from "@ant-design/icons";

const SignUp = () => {
  const [form] = Form.useForm();
  const [signupStatus, setSignupStatus] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const storage = getStorage(); // Initialize Firebase storage

  const handleAvatarUpload = (file) => {
    // Set the avatar URL in state when an image is selected
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarUrl(reader.result);
      console.log("Avatar URL set:", reader.result);
    };
  };

  const onFinish = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // Debugging: Log user UID
      console.log("User UID:", user.uid);

      // Upload the avatar if an image is selected
      if (avatarUrl) {
        // Create a reference to the user's avatar in Firebase Storage
        const avatarRef = storageRef(storage, `avatars/${user.uid}/avatar.jpg`);

        // Convert the avatarUrl to a Blob and upload it
        const response = await fetch(avatarUrl);
        const blob = await response.blob();

        // Upload the Blob data to Firebase Storage
        await uploadBytes(avatarRef, blob);

        // Get the download URL of the uploaded avatar
        const avatarDownloadUrl = await getDownloadURL(avatarRef);

        // Debugging: Log avatar download URL
        console.log("Avatar Download URL:", avatarDownloadUrl);

        // Update user profile with full name and avatar URL
        await user.updateProfile({
          displayName: values.fullName.toString(),
          photoURL: avatarDownloadUrl,
        });

        console.log("User profile updated:", user.displayName);
      } else {
        // If no avatar was uploaded, update the user profile with just the full name
        await updateProfile(user, {
          displayName: values.fullName,
        });
        console.log("User profile updated:", user.displayName);
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
