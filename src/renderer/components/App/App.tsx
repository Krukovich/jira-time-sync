// libraries
import React, { useEffect, useState } from "react";
// components
import Sidebar from "@renderer/components/Sidebar/Sidebar";
import Dashboard from "@renderer/views/Dashboard/Dashboard";
import Tasks from "@renderer/views/Tasks/Tasks";
import Statistics from "@renderer/views/Statistics/Statistics";
import Settings from "@renderer/views/Settings/Settings";
import Profile from "@renderer/views/Profile/Profile";
import Login from "@renderer/views/Login/Login";
// hooks
import useApplyTheme from "@renderer/hooks/useApplyTheme";
import { useNavigation } from "@renderer/store/navigation";
// utils
import "../../styles/global.css";

// TODO ADD SAVE USER IN GLOBAL STATE
const App = () => {
  const { view } = useNavigation();

  const [authState, setAuthState] = useState<"loading" | "authenticated" | "anonymous">("loading");

  useApplyTheme();

  useEffect(() => {
    window.api.auth.checkSession().then((res) => {
      if (res.authenticated) {
        setAuthState("authenticated");
      } else {
        setAuthState("anonymous");
      }
    });
  }, []);

  if (authState === "loading") return <div style={{ padding: 24 }}>Загрузка...</div>;
  if (authState === "anonymous")
    return (
      <Login
        onSuccess={() => {
          window.api.auth.checkSession().then((res) => {
            if (res.authenticated) {
              setAuthState("authenticated");
            }
          });
        }}
      />
    );

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
