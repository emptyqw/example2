import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./less/login.less";
import Logoimg from "../assets/logo1.png";
import { RegisterApi } from "../request/api";

export default function Register() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    RegisterApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.errCode === 0) {
        message.success(res.message);
        // 跳到登录页
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        message.error(res.message);
      }
    }); //跨域
  };
  return (
    <div className="login">
      <div className="login_box">
        <img src={Logoimg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请再次确认你的密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一样！"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请再次确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Link to="/login">已有账号？前往登陆</Link>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit" block>
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
