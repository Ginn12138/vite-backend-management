import request from "./axios";

export const getData = () => request.get("/home/getData");
export const getUser = (params) => request.get("user/getUser", { params });
export const addUser = (data) => request.post("user/addUser", data);
export const editUser = (data) => request.post("user/editUser", data);
export const delUser = (data) => request.post("user/delUser", data);
export const getMenu = (data) => request.post("permission/getMenu", data);

// export const getData = () => {
//   return request({
//     url: "/home/getData",
//     method: "get",
//   });
// };
