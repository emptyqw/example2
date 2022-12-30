import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  ReadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("查看文章列表", "sub1", <MailOutlined />, [
    getItem("Option List", "list", <ReadOutlined />),
    getItem("Option Table", "table", <ReadOutlined />),
  ]),
  getItem("文章编辑", "sub2", <EditOutlined />, [
    getItem("Option 2", "edit"),
    getItem("Option 6", "1"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("修改资料", "means", <AppstoreOutlined />),
];
const Aside = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultKey, setDefaultKey] = useState("");

  // 加空数组为了模仿componentDidMounted
  useEffect(() => {
    let path = location.pathname;
    let key = path.split("/")[1];
    setDefaultKey(key);
  }, [location.pathname]);

  const handleClick = (e) => {
    navigate("/" + e.key);
    setDefaultKey(e.key);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{
        width: 220,
      }}
      selectedKeys={[defaultKey]}
      className="aside"
      mode="inline"
      items={items}
    />
  );
};
export default Aside;
