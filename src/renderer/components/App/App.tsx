import * as React from "react";
import Sidebar from "../Sidebar/Sidebar.js";
import Dashboard from "../../views/Dashboard.js";
import "../../styles/global.css"

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar active="dashboard" />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
}
