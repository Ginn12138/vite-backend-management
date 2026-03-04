import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import permissionApi from "./mockData/permission";

Mock.mock(/home\/getData/, homeApi.getStatisticalData);
Mock.mock(/user\/getUser/, userApi.getUserList);
Mock.mock(/user\/addUser/, userApi.createUser);
Mock.mock(/user\/editUser/, userApi.updateUser);
Mock.mock(/user\/delUser/, userApi.deleteUser);
Mock.mock(/permission\/getMenu/, permissionApi.getMenu);
