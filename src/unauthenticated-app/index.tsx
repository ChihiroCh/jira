import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";
import { Button, Card } from "antd";
import { Helmet } from "react-helmet";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Helmet>
        <title>请登录或注册以继续</title>
      </Helmet>
      <Card>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};

export default UnauthenticatedApp;
