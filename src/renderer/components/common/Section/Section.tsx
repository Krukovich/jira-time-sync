// libraries
import React, { ReactNode } from "react";

const Section = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-title">{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
};

export default Section;
