import React from "react";
import { Layout, Menu } from "antd";
import MenuConfig from "../../config";
import * as Icon from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setTab } from "../../store/reducers/tab";
const { Sider } = Layout;

//  根据名字获取icon图标
const iconToElement = (name) => React.createElement(Icon[name]);

// 处理菜单数据，按照默认菜单需要的key、icon、label
const items = MenuConfig.map((item) => {
  const child = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label,
  };
  // 处理有子菜单的情况
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});

export default function CommonAside() {
  const collapsed = useSelector((state) => state.tab.isCollapse);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setTabList = (val) => {
    dispatch(setTab(val));
  };
  const jumpMenu = (e) => {
    console.log(e);
    navigate(e.key);

    let data;
    MenuConfig.forEach((item) => {
      // 用e.keyPath来匹配数据，是为了处理一级菜单和二级菜单的通用情况
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item;
        // 如果存在二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === e.key;
          });
        }
      }
    });
    setTabList({ path: data.path, name: data.name, label: data.label });
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "后台" : "后台管理系统"}</h3>
      <Menu
        style={{ height: "100vh" }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        onClick={jumpMenu}
      />
    </Sider>
  );
}
