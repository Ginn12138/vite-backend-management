import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./CommonHeader.module.css";
import { Button, Layout, Avatar, Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header } = Layout;

import defaultAvatar from "../../assets/images/user-default.png";
import { collapseMenu } from "../../store/reducers/tabSlice";

export default function CommonHeader() {
  const collapsed = useSelector((state) => state.tab.isCollapse);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={logout} target="_blank" rel="noopener noreferrer">
          退出
        </a>
      ),
    },
  ];

  return (
    <Header className={styles.container}>
      <Button
        onClick={() => {
          dispatch(collapseMenu());
        }}
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          backgroundColor: "#fff",
          fontSize: "16px",
          width: 64,
          height: 32,
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={36} src={defaultAvatar} />
      </Dropdown>
    </Header>
  );
}
