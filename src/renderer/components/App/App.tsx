// libraries
import React from "react";
// components
import Sidebar from "@renderer/components/Sidebar/Sidebar";
import Dashboard from "@renderer/views/Dashboard/Dashboard";
import Tasks from "@renderer/views/Tasks/Tasks";
import Statistics from "@renderer/views/Statistics/Statistics";
import Settings from "@renderer/views/Settings/Settings";
import Profile from "@renderer/views/Profile/Profile";
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
