import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from "./CommonTag.module.css";
import { Space, Tag } from "antd";

import { closeTab, setTab } from "../../store/reducers/tabSlice";

export default function CommonTag() {
  const tabList = useSelector((state) => state.tab.tabList);
  const currentTab = useSelector((state) => state.tab.currentTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (item) => {
    dispatch(setTab(item));
    navigate(item.path);
  };
  const handleClose = (item, index) => {
    const length = tabList.length - 1;
    let targetTab;
    if (index === length) {
      targetTab = tabList[index - 1];
    } else {
      targetTab = tabList[index + 1];
    }
    dispatch(setTab(targetTab));
    navigate(targetTab.path);
    dispatch(closeTab(item));
  };
  const setTag = (flag, item, index) => {
    return flag ? (
      // 是当前页面，标签渲染成激活样式，点击可关闭标签
      <Tag
        key={item.name}
        color="#55acee"
        closeIcon
        onClose={() => handleClose(item, index)}
      >
        {item.label}
      </Tag>
    ) : (
      // 不是当前页面，标签渲染成普通样式，点击可切换到别的标签
      <Tag key={item.name} onClick={() => handleChange(item)}>
        {item.label}
      </Tag>
    );
  };

  return (
    <Space className={styles.tag} size={[0, 8]} wrap>
      {currentTab.name &&
        tabList.map((item, index) =>
          setTag(item.path === currentTab.path, item, index),
        )}
    </Space>
  );
}
