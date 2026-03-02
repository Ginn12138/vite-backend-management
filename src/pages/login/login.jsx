import "./login.css";
import { Button, Form, Input, message } from "antd";
import { getMenu } from "../../api";
import { Navigate, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  // 登录状态下，会重定向到主页
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (val) => {
    if (!val.username || !val.password) {
      return message.open({ type: "warning", content: "请输入用户名和密码" });
    }
    getMenu(val)
      .then((res) => {
        // console.log(res);
        localStorage.setItem("token", res.data.data.token);
        message.success("登录成功");
        navigate("/home");
      })
      .catch((error) => {
        // console.log(error.message);
        message.error("用户名或密码错误");
      });
  };

  return (
    <Form className="login-container" onFinish={handleSubmit}>
      <div className="login-title">登录界面</div>
      <Form.Item label="账号" name="username">
        <Input placeholder="请输入账号"></Input>
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input.Password placeholder="请输入密码"></Input.Password>
      </Form.Item>
      <Form.Item className="login-button">
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}
