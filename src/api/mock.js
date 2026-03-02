import Mock from "mockjs";
import homeApi from "./mockServeData/home";
import userApi from "./mockServeData/user";
import permissionApi from "./mockServeData/permission";

Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/user\/getUser/, userApi.getUserList);
Mock.mock(/user\/addUser/, userApi.createUser);
Mock.mock(/user\/editUser/, userApi.updateUser);
Mock.mock(/user\/delUser/, userApi.deleteUser);
Mock.mock(/permission\/getMenu/, permissionApi.getMenu);
