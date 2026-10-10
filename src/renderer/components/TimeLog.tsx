import * as React from "react";
import { MockTimeEntry } from "../mocks/data.js";

function formatHM(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}ч ${String(m).padStart(2, "0")}м`;
}

export default function TimeLog({ entries }: { entries: MockTimeEntry[] }) {
  const totalSeconds = entries.reduce((s, e) => s + e.durationSeconds, 0);

  return (
    <div className="card">
      <div className="card-title">
        <span>📝 ЛОГ ЗА СЕГОДНЯ</span>
        <span className="mono">{formatHM(totalSeconds)}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr auto",
              gap: 10,
              padding: "8px 10px",
              background: entry.synced ? "transparent" : "rgba(210, 153, 34, 0.08)",
              borderRadius: 4,
              fontSize: 12,
              alignItems: "center",
            }}
          >
            <span className="mono" style={{ color: "var(--text-secondary)" }}>
              {entry.startTime}
            </span>
            <span
              style={{
                color: entry.isNonDev ? "var(--warning)" : "var(--text-primary)",
                fontFamily: entry.isNonDev ? "inherit" : "var(--mono)",
              }}
            >
              {entry.taskKey}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="mono">{formatHM(entry.durationSeconds)}</span>
              {entry.synced ? (
                <span style={{ color: "var(--success)" }}>✓</span>
              ) : (
                <span style={{ color: "var(--warning)", fontSize: 10 }}>●</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
