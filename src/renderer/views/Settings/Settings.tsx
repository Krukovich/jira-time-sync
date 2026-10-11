// libraries
import React, { useState } from "react";
// components
import Checkbox from "@renderer/components/common/Checkbox/Checkbox";
import Section from "@renderer/components/common/Section/Section";
import Field from "@renderer/components/common/Field/Field";
import LanguageSwitcher from "@renderer/components/LanguageSwitcher/LanguageSwitcher";
// hooks
import { useTranslation } from "react-i18next";
// utils
import { mockSettings } from "@renderer/mocks/data";

const Settings = () => {
  const { t } = useTranslation();

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
    <div className="content-scroll">
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>⚙️ {t("settings.title")}</h1>

      <div style={{ maxWidth: 720 }}>
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
              <button className="btn-secondary">{t("settings.check")}</button>
            </div>
          </Field>
        </Section>
      </div>

      <div style={{ maxWidth: 720 }}>
        <Section title={"🎯 " + t("settings.goals")}>
          <Field label={t("settings.dailyHours")}>
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
          <Field label={t("settings.workingDays")}>
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
      </div>

      <div style={{ maxWidth: 720 }}>
        <Section title="⚡ NON-DEV">
          <Field label={t("settings.quarter")}>
            <input
              type="text"
              value={settings.nonDevQuarter}
              onChange={(e) => setSettings({ ...settings, nonDevQuarter: e.target.value })}
              className="input"
              style={{ maxWidth: 120 }}
            />
          </Field>
          <Field label={t("settings.taskKey")}>
            <input
              type="text"
              value={settings.nonDevTaskKey}
              onChange={(e) => setSettings({ ...settings, nonDevTaskKey: e.target.value })}
              className="input"
              style={{ maxWidth: 180 }}
            />
          </Field>
        </Section>
      </div>

      <div style={{ maxWidth: 720 }}>
        <Section title={"🔔 " + t("settings.notifications")}>
          <Checkbox
            label={t("settings.lowHours")}
            checked={settings.notifications.lowHours}
            onChange={() => toggleNotification("lowHours")}
          />
          <Checkbox
            label={t("settings.unsentWorklog")}
            checked={settings.notifications.unsentWorklog}
            onChange={() => toggleNotification("unsentWorklog")}
          />
          <Checkbox
            label={t("settings.overdueTasks")}
            checked={settings.notifications.overdueTasks}
            onChange={() => toggleNotification("overdueTasks")}
          />
        </Section>
      </div>

      <div style={{ maxWidth: 720 }}>
        <Section title={"🌐 " + t("settings.localisation")}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <LanguageSwitcher />
          </div>
        </Section>
      </div>

      <div style={{ maxWidth: 720 }}>
        <Section title={"📦 " + t("settings.data")}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button className="btn-secondary">{t("settings.exportCsv")}</button>
            <button className="btn-secondary">{t("settings.backup")}</button>
            <button className="btn-secondary" style={{ color: "var(--danger)" }}>
              {t("settings.clear")}
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Settings;
