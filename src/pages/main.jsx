import { Outlet } from "react-router";
import { Layout, theme } from "antd";
const { Content } = Layout;

import CommonAside from "../components/CommonAside/CommonAside";
import CommonHeader from "../components/CommonHeader/CommonHeader";
import CommonTag from "../components/CommonTag/CommonTag";
import RouterAuth from "../router/RouterAuth";

export default function Main() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonAside />
        <Layout>
          <CommonHeader />
          <CommonTag />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  );
}
