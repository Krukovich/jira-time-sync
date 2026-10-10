// libraries
import React from "react";

const Stat = ({ label, value, color }: { label: string; value: string; color?: string }) => {
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 4 }}>{label}</div>
      <div className="mono" style={{ fontSize: 16, color: color ?? "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
};

export default Stat;
