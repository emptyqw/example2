import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

export default function Bread() {
  const { pathname } = useLocation();
  const [breadName, setBreadName] = useState("");
  //   路径一旦变化就要获取对应的路径名称并且修改breadName
  //   监听理由的路径
  useEffect(() => {
    switch (pathname) {
      case "/list":
        setBreadName("List查看文章列表");
        break;
      case "/table":
        setBreadName("Table查看文章列表");
        break;
      case "/edit":
        setBreadName("文章编辑");
        break;
      case "/means":
        setBreadName("修改资料");
        break;
      default:
        break;
    }
  }, [pathname]);
  return (
    <Breadcrumb style={{ height: "30px", lineHight: "30px" }}>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
        &nbsp; Home
      </Breadcrumb.Item>
      <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
