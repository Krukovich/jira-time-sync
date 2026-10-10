import * as React from "react";

const items = [
  { id: "dashboard", icon: "⏱", label: "Дашборд" },
  { id: "tasks", icon: "📋", label: "Задачи" },
  { id: "stats", icon: "📊", label: "Статистика" },
  { id: "settings", icon: "⚙️", label: "Настройки" },
];

export default function Sidebar({ active = "dashboard" }: { active?: string }) {
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
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          title={item.label}
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            fontSize: 18,
            background: active === item.id ? "var(--bg-card)" : "transparent",
            color: active === item.id ? "var(--accent)" : "var(--text-secondary)",
          }}
        >
          {item.icon}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button
        title="Тема"
        style={{ width: 40, height: 40, fontSize: 16, color: "var(--text-secondary)" }}
      >
        🌙
      </button>
      <button
        title="Профиль"
        style={{ width: 40, height: 40, fontSize: 16, color: "var(--text-secondary)" }}
      >
        👤
      </button>
    </aside>
  );
}
