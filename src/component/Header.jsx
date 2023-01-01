import React, { useEffect, useState } from "react";
import LogoImg from "../assets/logo1.png";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, message } from "antd";
import defaultAvatar from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("游客");
  const [avatar, setAvatar] = useState(defaultAvatar);

  //   模拟componentDidmount
  useEffect(() => {
    let username1 = localStorage.getItem("username");
    let avatar1 = localStorage.getItem("avatar");
    if (username1) {
      setUsername(username1);
    }
    if (avatar1) {
      setAvatar("http://47.93.114.103:6688/" + avatar1);
    }
  }, [localStorage.getItem("avatar")]);

  //   退出登录
  const logout = () => {
    // 清除数据
    localStorage.clear();
    message.success("退出成功,即将返回登录页...");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          修改资料
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a onClick={logout} target="_blank" rel="noopener noreferrer">
          退出登录
        </a>
      ),
    },
  ];
  return (
    <header>
      <img src={LogoImg} alt="" className="logo" />
      <div className="right">
        <Dropdown
          menu={{
            items,
          }}
        >
          <a className="ant-dropdoen-link" onClick={(e) => e.preventDefault()}>
            <img src={avatar} alt="" className="avatar" />
            <span>{username}</span>
            <CaretDownOutlined />
          </a>
        </Dropdown>
      </div>
    </header>
  );
}
