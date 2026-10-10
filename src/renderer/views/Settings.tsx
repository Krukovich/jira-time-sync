// libraries
import React, { ReactNode, useState } from "react";
// utils
import { mockSettings } from "../mocks/data.js";

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);

  const toggleDay = (i: number) => {
    const days = [...settings.workingDays];
    days[i] = !days[i];
    setSettings({ ...settings, workingDays: days });
  };

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: !settings.notifications[key] },
    });
  };

  return (
    <div className="content-scroll" style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>⚙️ Настройки</h1>

      {/* Jira */}
      <Section title="🔌 JIRA">
        <Field label="URL">
          <input
            type="text"
            value={settings.jiraUrl}
            onChange={(e) => setSettings({ ...settings, jiraUrl: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="input"
          />
        </Field>
        <Field label="API Token">
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="password"
              value={settings.hasToken ? "••••••••••••" : ""}
              readOnly
              className="input"
            />
            <button className="btn-secondary">Проверить</button>
          </div>
        </Field>
      </Section>

      {/* Цели */}
      <Section title="🎯 ЦЕЛИ">
        <Field label="Часов в день">
          <input
            type="number"
            min={1}
            max={24}
            value={settings.dailyGoalHours}
            onChange={(e) => setSettings({ ...settings, dailyGoalHours: Number(e.target.value) })}
            className="input"
            style={{ maxWidth: 100 }}
          />
        </Field>
        <Field label="Рабочие дни">
          <div style={{ display: "flex", gap: 6 }}>
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
              <button
                key={day}
                onClick={() => toggleDay(i)}
                style={{
                  width: 40,
                  height: 34,
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  background: settings.workingDays[i] ? "var(--accent)" : "var(--bg-card)",
                  color: settings.workingDays[i] ? "white" : "var(--text-secondary)",
                  fontSize: 12,
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </Field>
      </Section>

      {/* Non-dev */}
      <Section title="⚡ NON-DEV">
        <Field label="Текущий квартал">
          <input
            type="text"
            value={settings.nonDevQuarter}
            onChange={(e) => setSettings({ ...settings, nonDevQuarter: e.target.value })}
            className="input"
            style={{ maxWidth: 120 }}
          />
        </Field>
        <Field label="Ключ задачи">
          <input
            type="text"
            value={settings.nonDevTaskKey}
            onChange={(e) => setSettings({ ...settings, nonDevTaskKey: e.target.value })}
            className="input"
            style={{ maxWidth: 180 }}
          />
        </Field>
      </Section>

      {/* Уведомления */}
      <Section title="🔔 УВЕДОМЛЕНИЯ">
        <Checkbox
          label="Напоминать, если меньше 7 часов к концу дня"
          checked={settings.notifications.lowHours}
          onChange={() => toggleNotification("lowHours")}
        />
        <Checkbox
          label="Напоминать отправить worklog"
          checked={settings.notifications.unsentWorklog}
          onChange={() => toggleNotification("unsentWorklog")}
        />
        <Checkbox
          label="Уведомлять о просроченных задачах"
          checked={settings.notifications.overdueTasks}
          onChange={() => toggleNotification("overdueTasks")}
        />
      </Section>

      {/* Данные */}
      <Section title="📦 ДАННЫЕ">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn-secondary">Экспорт в CSV</button>
          <button className="btn-secondary">Резервная копия</button>
          <button className="btn-secondary" style={{ color: "var(--danger)" }}>
            Очистить данные
          </button>
        </div>
      </Section>

      <style>{`
        .input {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px 10px;
          color: var(--text-primary);
          font-size: 13px;
          width: 100%;
          font-family: inherit;
        }
        .input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .btn-secondary {
          padding: 8px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="card" style={{ marginBottom: 16 }}>
      <div className="card-title">{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, alignItems: "center" }}
    >
      <label style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</label>
      {children}
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 13 }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default Settings;
