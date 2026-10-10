// libraries
import React from "react";
// components
import Stat from "@renderer/components/Stat/Stat";
// utils
import { formatHM } from "@renderer/utils/format";

const DayProgress = ({
  tracked,
  goal,
  dev,
  nonDev,
}: {
  tracked: number;
  goal: number;
  dev: number;
  nonDev: number;
}) => {
  const percent = Math.min(100, Math.round((tracked / goal) * 100));
  const remaining = Math.max(0, goal - tracked);
  const color = percent < 50 ? "var(--danger)" : percent < 85 ? "var(--warning)" : "var(--success)";

  return (
    <div className="card">
      <div className="card-title">📊 ПРОГРЕСС ДНЯ</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 8,
            background: "var(--bg-card)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: color,
              transition: "width 0.3s",
            }}
          />
        </div>
        <span className="mono" style={{ color, fontWeight: 600 }}>
          {percent}%
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Stat label="Затрекано" value={formatHM(tracked)} />
        <Stat label="Осталось" value={formatHM(remaining)} />
        <Stat label="Dev" value={formatHM(dev)} color="var(--accent)" />
        <Stat label="Non-dev" value={formatHM(nonDev)} color="var(--warning)" />
      </div>
    </div>
  );
};

export default DayProgress;
