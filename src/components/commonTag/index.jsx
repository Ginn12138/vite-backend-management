import "./index.css";
import { Space, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeTab, setTab } from "../../store/reducers/tab";
import { useNavigate } from "react-router";

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
      <Tag
        key={item.name}
        color="#55acee"
        closeIcon
        onClose={() => handleClose(item, index)}
      >
        {item.label}
      </Tag>
    ) : (
      <Tag key={item.name} onClick={() => handleChange(item)}>
        {item.label}
      </Tag>
    );
  };

  return (
    <Space className="common-tag" size={[0, 8]} wrap>
      {currentTab.name &&
        tabList.map((item, index) =>
          setTag(item.path === currentTab.path, item, index),
        )}
    </Space>
  );
}
