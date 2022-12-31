import React from "react";
import "./assets/base.less";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./component/Header";
import Aside from "./component/Aside";
import Bread from "./component/Bread";

export default function App() {
  return (
    <Layout id="app">
      <Header />
      <div className="container">
        <Aside />
        <div className="container_box">
          <Bread />
          <div className="container_content">
            <Outlet />
          </div>
        </div>
      </div>
      <footer>Respect | Copyright &copy; 2022 Author 袁超业</footer>
    </Layout>
  );
}
