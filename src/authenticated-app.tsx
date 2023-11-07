import { Button, Dropdown, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectList from "screens/project-list";
import type { MenuProps } from "antd";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <Button onClick={logout} type={"link"}>
          登出
        </Button>
        // </a>
      ),
    },
  ];
  return (
    <Layout>
      <Header
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.1)",
          padding: "3.2rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <div>项目</div>
          <div>用户</div>
        </div>
        <Dropdown menu={{ items }}>
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
        {/* <Button onClick={logout}>登出</Button> */}
      </Header>
      <Content>
        <ProjectList />
      </Content>
    </Layout>
  );
};

export default AuthenticatedApp;
