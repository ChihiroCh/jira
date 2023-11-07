import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在jira-dev-tool后面引入 安装最新 版本不需要
// import 'antd/dist/antd.less';
import { ConfigProvider } from "antd";
import { AppProviders } from "context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token，影响范围大
              colorPrimary: "rgb(0,82,204)",
              fontSize: 16,
            },
          }}
        >
          <DevTools />
          <App />
        </ConfigProvider>
      </AppProviders>
    </React.StrictMode>,
  ),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
