import * as React from "react";

function formatClock(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function ActiveTimer({
  jiraKey,
  summary,
  elapsedSeconds,
  running,
}: {
  jiraKey: string;
  summary: string;
  elapsedSeconds: number;
  running: boolean;
}) {
  return (
    <div
      className="card"
      style={{
        background: running ? "linear-gradient(135deg, #161B22, #1f1810)" : "var(--bg-panel)",
        borderColor: running ? "var(--timer)" : "var(--border)",
      }}
    >
      <div className="card-title">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: running ? "var(--success)" : "var(--text-secondary)",
              animation: running ? "pulse 1.5s infinite" : "none",
            }}
          />
          {running ? "ИДЁТ ТАЙМЕР" : "ТАЙМЕР ОСТАНОВЛЕН"}
        </span>
      </div>

      <div className="mono" style={{ color: "var(--accent)", fontSize: 12, marginBottom: 4 }}>
        {jiraKey}
      </div>
      <div style={{ marginBottom: 16, color: "var(--text-primary)" }}>{summary}</div>

      <div
        className="mono"
        style={{
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: 2,
          textAlign: "center",
          margin: "16px 0",
          color: running ? "var(--timer)" : "var(--text-primary)",
        }}
      >
        {formatClock(elapsedSeconds)}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          style={{
            flex: 1,
            padding: "10px 16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            color: "var(--text-primary)",
          }}
        >
          ⏸ Пауза
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px 16px",
            background: "var(--danger)",
            borderRadius: 6,
            color: "white",
          }}
        >
          ⏹ Стоп
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
