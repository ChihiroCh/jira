import React, { useState } from "react";
import RegisterScreen from "./register";
import LoginScreen from "./login";

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "登录" : "注册"}
      </button>
    </div>
  );
};

export default UnauthenticatedApp;
