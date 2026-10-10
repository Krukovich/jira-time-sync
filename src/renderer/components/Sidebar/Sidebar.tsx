// libraries
import React from "react";
// hooks
import { useNavigation, View } from "@renderer/store/navigation";
import { useTheme } from "@renderer/store/theme";

const items: { id: View; icon: string; label: string }[] = [
  { id: "dashboard", icon: "⏱", label: "Дашборд" },
  { id: "tasks", icon: "📋", label: "Задачи" },
  { id: "stats", icon: "📊", label: "Статистика" },
  { id: "settings", icon: "⚙️", label: "Настройки" },
];

const Sidebar = () => {
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
          title={item.label}
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
        title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
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
        title="Профиль"
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
