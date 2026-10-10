// libraries
import React from "react";
// components
import Sidebar from "@renderer/components/Sidebar/Sidebar";
import Dashboard from "@renderer/views/Dashboard";
import Tasks from "@renderer/views/Tasks";
import Statistics from "@renderer/views/Statistics";
import Settings from "@renderer/views/Settings";
import Profile from "@renderer/views/Profile";
// hooks
import { useNavigation } from "@renderer/store/navigation";
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
