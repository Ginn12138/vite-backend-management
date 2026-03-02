import axios from "axios";

// 创建axios实例,用request发生请求
const request = axios.create({
  // 相对路径,前面域名自动补齐
  // http://localhost:3000/api
  baseURL: "api",
  timeout: 30 * 1000,
  headers: {},
});

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  //HTTP请求成功执行函数
  function (response) {
    if (response.data.code === 20000) {
      return response;
    } else {
      // 业务失败执行函数
      // 统一的错误处理
      return Promise.reject(new Error(response.data.message || "My Error"));
    }
  },
  //HTTP请求失败执行函数
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
