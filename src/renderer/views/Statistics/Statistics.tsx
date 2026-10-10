// libraries
import React from "react";
// components
import StatCard from "@renderer/components/StatCard/StatCard";
// utils
import { mockMonthlyStats, mockWeeklyStats } from "@renderer/mocks/data";
import { formatHM } from "@renderer/utils/format";

const Statistics = () => {
  const maxTotal = Math.max(...mockWeeklyStats.map((d) => d.total));

  return (
    <div className="content-scroll">
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>📊 Статистика</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <StatCard label="Всего за месяц" value={formatHM(mockMonthlyStats.totalTracked)} />
        <StatCard label="Среднее в день" value={formatHM(mockMonthlyStats.avgPerDay)} />
        <StatCard label="Dev" value={`${mockMonthlyStats.devPercent}%`} color="var(--accent)" />
        <StatCard
          label="Non-dev"
          value={`${mockMonthlyStats.nonDevPercent}%`}
          color="var(--warning)"
        />
        <StatCard
          label="Отправлено worklog"
          value={String(mockMonthlyStats.submittedWorklogs)}
          color="var(--success)"
        />
        <StatCard
          label="Не отправлено"
          value={String(mockMonthlyStats.pendingWorklogs)}
          color="var(--danger)"
        />
      </div>

      <div className="card">
        <div className="card-title">📈 За неделю</div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
            height: 200,
            padding: "20px 0",
          }}
        >
          {mockWeeklyStats.map((day) => {
            const totalHeight = (day.total / maxTotal) * 100;
            const devShare = (day.dev / day.total) * 100;
            return (
              <div
                key={day.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  height: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <div className="mono" style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                  {formatHM(day.total)}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: `${totalHeight}%`,
                    background: "var(--bg-card)",
                    borderRadius: 4,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column-reverse",
                    minHeight: 4,
                  }}
                >
                  <div style={{ height: `${devShare}%`, background: "var(--accent)" }} />
                  <div style={{ height: `${100 - devShare}%`, background: "var(--warning)" }} />
                </div>
                <div style={{ fontSize: 12, color: "var(--text-primary)" }}>{day.day}</div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 11,
            color: "var(--text-secondary)",
            marginTop: 12,
          }}
        >
          <span>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                background: "var(--accent)",
                borderRadius: 2,
                marginRight: 6,
              }}
            />
            Dev
          </span>
          <span>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 10,
                background: "var(--warning)",
                borderRadius: 2,
                marginRight: 6,
              }}
            />
            Non-dev
          </span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
