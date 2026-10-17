// libraries
import React, { useEffect, useState } from "react";
// hooks
import { useTranslation } from "react-i18next";
// utils
import { formatClock } from "@renderer/utils/format";

export const ActiveTimer = ({
  jiraKey,
  summary,
  initialSeconds = 0,
  initialRunning = false,
}: {
  jiraKey: string;
  summary: string;
  initialSeconds?: number;
  initialRunning?: boolean;
}) => {
  const { t } = useTranslation();

  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(initialRunning);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const handlePause = () => {
    setIsRunning(false);
    window.api.timer.toggleTimer(false);
  };

  const handleResume = () => {
    setIsRunning(true);
    window.api.timer.toggleTimer(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
    window.api.timer.toggleTimer(false);
  };

  return (
    <div
      className="card"
      style={{
        background: "var(--bg-card)",
        borderColor: isRunning ? "var(--timer)" : "var(--border)",
      }}
    >
      <div className="card-title">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: isRunning ? "var(--success)" : "var(--text-secondary)",
              animation: isRunning ? "pulse 1.5s infinite" : "none",
            }}
          />
          {isRunning ? t("dashboard.activeTimer") : t("dashboard.timerStopped")}
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
          color: isRunning ? "var(--timer)" : "var(--text-primary)",
        }}
      >
        {formatClock(seconds)}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {isRunning ? (
          <button
            onClick={handlePause}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--text-primary)",
              cursor: "pointer",
            }}
          >
            ⏸ {t("dashboard.pause")}
          </button>
        ) : (
          <button
            onClick={handleResume}
            style={{
              flex: 1,
              padding: "10px 16px",
              background: "var(--success)",
              border: "1px solid var(--success)",
              borderRadius: 6,
              color: "white",
              cursor: "pointer",
            }}
          >
            ▶ {seconds > 0 ? t("dashboard.resume") : t("dashboard.start")}
          </button>
        )}
        <button
          onClick={handleStop}
          style={{
            flex: 1,
            padding: "10px 16px",
            background: "var(--danger)",
            borderRadius: 6,
            color: "white",
            cursor: "pointer",
            opacity: isRunning || seconds > 0 ? 1 : 0.5,
          }}
        >
          ⏹ {t("dashboard.stop")}
        </button>
      </div>
    </div>
  );
};

export default ActiveTimer;
