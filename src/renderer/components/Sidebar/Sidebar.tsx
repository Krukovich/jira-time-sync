// libraries
import React from "react";
// hooks
import { useTranslation } from "react-i18next";
import { useNavigation, View } from "@renderer/store/navigation";
import { useTheme } from "@renderer/store/theme";

const items: { id: View; icon: string; label: string }[] = [
  { id: "dashboard", icon: "⏱", label: "nav.dashboard" },
  { id: "tasks", icon: "📋", label: "nav.tasks" },
  { id: "stats", icon: "📊", label: "nav.stats" },
  { id: "settings", icon: "⚙️", label: "nav.settings" },
];

const Sidebar = () => {
  const { t } = useTranslation();

  const { view, setView } = useNavigation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      style={{
        background: "var(--bg-panel)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px 0",
        gap: 8,
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          title={t(item.label)}
          onClick={() => setView(item.id)}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            fontSize: 18,
            background: view === item.id ? "var(--bg-card)" : "transparent",
            color: view === item.id ? "var(--accent)" : "var(--text-secondary)",
            transition: "background 0.15s, color 0.15s",
          }}
        >
          {item.icon}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button
        title={theme === "dark" ? t("nav.darkTheme") : t("nav.lightTheme")}
        onClick={toggleTheme}
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          fontSize: 16,
          color: "var(--text-secondary)",
        }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <button
        title={t("nav.profile")}
        onClick={() => setView("profile")}
        style={{
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          fontSize: 16,
          background: view === "profile" ? "var(--bg-card)" : "transparent",
          color: view === "profile" ? "var(--accent)" : "var(--text-secondary)",
        }}
      >
        👤
      </button>
    </aside>
  );
};

export default Sidebar;
