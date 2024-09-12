import React, { useState } from "react";
import "./assets/base.less";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "./component/Header";
import Aside from "./component/Aside";
import Bread from "./component/Bread";

export default function App() {
  const [mykey, setMykey] = useState(1);
  return (
    <Layout id="app">
      <Header key={mykey} />
      <div className="container">
        <Aside />
        <div className="container_box">
          <Bread />
          <div className="container_content">
            <Outlet setMykey={setMykey} />
          </div>
        </div>
      </div>
      <footer>Respect | Copyright &copy; 2022 Author 袁超业</footer>
    </Layout>
  );
}
