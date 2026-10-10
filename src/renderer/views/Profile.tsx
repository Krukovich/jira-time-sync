// libraries
import React from "react";
// utils
import { mockProfile } from "@renderer/mocks/data";
import { formatHM } from "@renderer/utils/format";

function initials(name: string) {
  return name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card" style={{ padding: 14, textAlign: "center" }}>
      <div className="mono" style={{ fontSize: 22, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{label}</div>
    </div>
  );
}

const Profile = () => {
  return (
    <div className="content-scroll" style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>👤 Профиль</h1>

      <div
        className="card"
        style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16 }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 600,
            color: "white",
          }}
        >
          {initials(mockProfile.name)}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{mockProfile.name}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {mockProfile.role}
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}
          >
            {mockProfile.email}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button
          className="btn-secondary"
          style={{
            padding: "8px 16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            color: "var(--text-primary)",
          }}
        >
          Редактировать
        </button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}
      >
        <StatCard label="Всего часов" value={formatHM(mockProfile.stats.totalHours * 3600)} />
        <StatCard label="Задач закрыто" value={String(mockProfile.stats.tasksClosed)} />
        <StatCard label="Среднее в день" value={`${mockProfile.stats.avgPerDay}ч`} />
      </div>

      <div className="card">
        <div className="card-title">🔌 ПОДКЛЮЧЕНИЕ JIRA</div>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, fontSize: 13 }}>
          <span style={{ color: "var(--text-secondary)" }}>URL</span>
          <span className="mono">{mockProfile.jiraUrl}</span>
          <span style={{ color: "var(--text-secondary)" }}>Аккаунт</span>
          <span>{mockProfile.email}</span>
          <span style={{ color: "var(--text-secondary)" }}>Дата регистрации</span>
          <span>{new Date(mockProfile.joinedAt).toLocaleDateString("ru-RU")}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
