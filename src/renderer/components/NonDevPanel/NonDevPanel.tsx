// libraries
import React from "react";

const NonDevPanel = ({ trackedSeconds }: { trackedSeconds: number }) => {
  const h = Math.floor(trackedSeconds / 3600);
  const m = Math.floor((trackedSeconds % 3600) / 60);

  return (
    <div className="card">
      <div className="card-title">⚡ NON-DEV (Q4 2026)</div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ color: "var(--text-primary)", marginBottom: 4 }}>Meetings & Overhead</div>
        <div className="mono" style={{ color: "var(--warning)", fontSize: 18 }}>
          {h}ч {m}м{" "}
          <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>/ без лимита</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {["+15м", "+30м", "+1ч", "Свой"].map((label) => (
          <button
            key={label}
            style={{
              padding: "8px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              fontSize: 12,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NonDevPanel;
