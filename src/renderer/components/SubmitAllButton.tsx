import * as React from "react";

export default function SubmitAllButton({ pending }: { pending: number }) {
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
      ⬆ Отправить всё в Jira ({pending} {pluralize(pending, "запись", "записи", "записей")})
    </button>
  );
}

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}
