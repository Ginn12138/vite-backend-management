import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    isCollapse: false,
    tabList: [{ path: "/", name: "home", label: "首页" }],
    currentTab: {},
  },
  reducers: {
    collapseMenu: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    setTab: (state, { payload: val }) => {
      // 如果点击的不是首页
      if (val.name !== "home") {
        state.currentTab = val; //设置为当前激活标签
        // 不在标签中才需要添加
        const result = state.tabList.findIndex(
          (item) => item.name === val.name,
        );
        if (result === -1) {
          state.tabList.push(val);
        }
      } else {
        // 如果点击的是首页，隐藏标签
        state.currentTab = {};
      }
    },
    closeTab: (state, { payload: val }) => {
      const res = state.tabList.findIndex((item) => item.name === val.name);
      state.tabList.splice(res, 1);
    },
  },
});

export const { collapseMenu, setTab, closeTab } = tabSlice.actions;
export default tabSlice.reducer;
