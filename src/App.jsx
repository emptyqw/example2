import React from "react";
import "./assets/base.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
