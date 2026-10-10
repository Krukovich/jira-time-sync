// libraries
import React from "react";
// hooks
import { useTranslation } from "react-i18next";
// utils
import { pluralize } from "@renderer/utils/pluralize";

const SubmitAllButton = ({ pending }: { pending: number }) => {
  const { t } = useTranslation();

  const disabled = pending === 0;

  return (
    <button
      disabled={disabled}
      style={{
        width: "100%",
        padding: "14px 24px",
        background: disabled ? "var(--bg-card)" : "var(--accent)",
        color: disabled ? "var(--text-secondary)" : "white",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.2s",
      }}
    >
      ⬆ {t("dashboard.submitAll")} ({pending}{" "}
      {pluralize(
        pending,
        t("dashboard.record_one"),
        t("dashboard.record_few"),
        t("dashboard.record_many"),
      )}
      )
    </button>
  );
};

export default SubmitAllButton;
