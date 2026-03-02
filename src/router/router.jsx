import { createBrowserRouter, Navigate } from "react-router";
import Main from "../pages/main";
import Home from "../pages/home/home";
import Mall from "../pages/mall/mall";
import User from "../pages/user/user";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";
import Login from "../pages/login/login";

const routes = [
  {
    path: "/",
    Component: Main,
    children: [
      // 分析功能，发现网页是/的时候会跳转到/home，显示的是Home页面，也就是重定向
      { path: "/", element: <Navigate to="home" /> },

      { path: "home", Component: Home },
      { path: "mall", Component: Mall },
      { path: "user", Component: User },
      {
        path: "other",
        children: [
          { path: "pageone", Component: PageOne },
          { path: "pagetwo", Component: PageTwo },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
];

export default createBrowserRouter(routes);
