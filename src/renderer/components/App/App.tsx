// libraries
import React from "react";
// components
import Sidebar from "../Sidebar/Sidebar.js";
import Dashboard from "../../views/Dashboard.js";
import Tasks from "../../views/Tasks.js";
import Statistics from "../../views/Statistics.js";
import Profile from "../../views/Profile.js";
import Settings from "../../views/Settings.js";
// hooks
import { useNavigation } from "../../store/navigation.js";
// utils
import "../../styles/global.css";

const App = () => {
  const { view } = useNavigation();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {view === "dashboard" && <Dashboard />}
        {view === "tasks" && <Tasks />}
        {view === "stats" && <Statistics />}
        {view === "settings" && <Settings />}
        {view === "profile" && <Profile />}
      </div>
    </div>
  );
};

export default App;
