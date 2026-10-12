// libraries
import React, { ReactNode } from "react";

const Field = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 12, alignItems: "center" }}
    >
      <label style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</label>
      {children}
    </div>
  );
};

export default Field;
