// libraries
import React from "react";
// components
import Sidebar from "../Sidebar/Sidebar.js";
import Dashboard from "../../views/Dashboard.js";
import "../../styles/global.css";

const App = () => {
  return (
    <div className="app-layout">
      <Sidebar active="dashboard" />
      <div className="main-content">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
