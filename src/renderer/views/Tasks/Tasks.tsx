// libraries
import React, { useState } from "react";
// components
import TopBar from "@renderer/components/TopBar/TopBar";
import TaskList from "@renderer/components/TaskList/TaskList";
// utils
import { mockDayProgress, mockTasks } from "@renderer/mocks/data";

const Tasks = () => {
  const [filter, setFilter] = useState<"all" | "dev" | "non-dev">("all");

  const filtered = mockTasks.filter((t) => {
    if (filter === "dev") return !t.jiraKey.startsWith("Non-dev");
    if (filter === "non-dev") return t.jiraKey.startsWith("Non-dev");

    return true;
  });

  return (
    <>
      <TopBar tracked={mockDayProgress.trackedSeconds} goal={mockDayProgress.goalSeconds} />
      <div className="content-scroll">
        <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
          {(["all", "dev", "non-dev"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                background: filter === f ? "var(--accent)" : "var(--bg-panel)",
                color: filter === f ? "white" : "var(--text-secondary)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            >
              {f === "all" ? "Все" : f === "dev" ? "Dev" : "Non-dev"}
            </button>
          ))}
        </div>
        <TaskList tasks={filtered} />
      </div>
    </>
  );
};

export default Tasks;
