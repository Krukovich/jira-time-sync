// libraries
import React from "react";
import { useTranslation } from "react-i18next";
// utils
import { formatHMS } from "@renderer/utils/format";

const TopBar = ({ tracked, goal }: { tracked: number; goal: number }) => {
  const { t } = useTranslation();

  return (
    <header
      style={{
        height: 52,
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--bg-panel)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 16 }}>⏱</span>
        <strong style={{ fontSize: 14 }}>{t("appName")}</strong>
      </div>
      <div className="mono" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        {t("dashboard.today")}:{" "}
        <span style={{ color: "var(--text-primary)" }}>{formatHMS(tracked)}</span> /{" "}
        {formatHMS(goal)}
      </div>
    </header>
  );
};

export default TopBar;
