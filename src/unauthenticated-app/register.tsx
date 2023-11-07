import { Button, Form } from "antd";
import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

const RegisterScreen = () => {
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //     }
  //   });
  // };
  const { user, register } = useAuth();
  const handelSubmit = (value: { username: string; password: string }) => {
    // const username = value;
    // const password = value;
    register(value);
  };
  return (
    <Form onFinish={handelSubmit}>
      <Form.Item name={"username"}>
        <input placeholder="请输入用户名" type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={"password"}>
        <input placeholder="请输入密码" type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
