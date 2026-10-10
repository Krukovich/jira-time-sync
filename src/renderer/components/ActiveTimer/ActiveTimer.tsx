// libraries
import React from "react";
// hooks
import { useTranslation } from "react-i18next";
// utils
import { formatClock } from "@renderer/utils/format";

export const ActiveTimer = ({
  jiraKey,
  summary,
  elapsedSeconds,
  running,
}: {
  jiraKey: string;
  summary: string;
  elapsedSeconds: number;
  running: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="card"
      style={{
        background: "var(--bg-card)",
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
          {running ? t("dashboard.activeTimer") : t("dashboard.timerStopped")}
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
          ⏸ {t("dashboard.pause")}
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
          ⏹ {t("dashboard.stop")}
        </button>
      </div>
    </div>
  );
};

export default ActiveTimer;
