// libraries
import React from "react";

const StatCard = ({ label, value, color }: { label: string; value: string; color?: string }) => {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 6 }}>{label}</div>
      <div className="mono" style={{ fontSize: 20, color: color ?? "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
};

export default StatCard;
