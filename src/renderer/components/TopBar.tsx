import * as React from "react";

function formatHMS(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}ч ${m}м`;
}

export default function TopBar({ tracked, goal }: { tracked: number; goal: number }) {
  return (
    <header
      style={{
        height: 52,
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--bg-panel)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 16 }}>⏱</span>
        <strong style={{ fontSize: 14 }}>Time Sync</strong>
      </div>
      <div className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        Сегодня: <span style={{ color: "var(--text-primary)" }}>{formatHMS(tracked)}</span> /{" "}
        {formatHMS(goal)}
      </div>
    </header>
  );
}
