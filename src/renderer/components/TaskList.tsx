import * as React from "react";
import { MockTask } from "../mocks/data.js";

function formatHM(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return m ? `${h}ч ${m}м` : `${h}ч`;
}

function dueColor(due: string | null) {
  if (!due) return "var(--text-secondary)";
  if (due === "Просрочено") return "var(--danger)";
  if (due === "Сегодня") return "var(--warning)";
  return "var(--success)";
}

export default function TaskList({
  tasks,
  onStart,
}: {
  tasks: MockTask[];
  onStart?: (key: string) => void;
}) {
  return (
    <div className="card">
      <div className="card-title">
        <span>📋 МОИ ЗАДАЧИ</span>
        <span style={{ fontSize: 11 }}>Фильтр: Все ▾</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {tasks.map((task) => {
          const progress =
            task.estimateSeconds > 0
              ? Math.min(100, (task.trackedSeconds / task.estimateSeconds) * 100)
              : 0;
          const overdue = task.dueDate === "Просрочено";

          return (
            <div
              key={task.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 12,
                padding: "10px 12px",
                background: "var(--bg-card)",
                borderLeft: `3px solid ${overdue ? "var(--danger)" : "transparent"}`,
                borderRadius: 6,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>
                    {task.jiraKey}
                  </span>
                  <span>{task.summary}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 11,
                    color: "var(--text-secondary)",
                  }}
                >
                  <span>{task.status}</span>
                  <span>·</span>
                  <span className="mono">
                    {formatHM(task.trackedSeconds)} / {formatHM(task.estimateSeconds)}
                  </span>
                  {task.dueDate && (
                    <>
                      <span>·</span>
                      <span style={{ color: dueColor(task.dueDate) }}>⏰ {task.dueDate}</span>
                    </>
                  )}
                </div>
                {task.estimateSeconds > 0 && (
                  <div
                    style={{
                      marginTop: 6,
                      height: 3,
                      background: "var(--bg-panel)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{ width: `${progress}%`, height: "100%", background: "var(--accent)" }}
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => onStart?.(task.jiraKey)}
                style={{
                  padding: "6px 12px",
                  background: "var(--bg-panel)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  color: "var(--text-primary)",
                  fontSize: 12,
                }}
              >
                ▶ Запустить
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
