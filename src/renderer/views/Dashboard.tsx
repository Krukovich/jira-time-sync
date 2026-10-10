import * as React from "react";
import TopBar from "../components/TopBar.js";
import ActiveTimer from "../components/ActiveTimer.js";
import DayProgress from "../components/DayProgress.js";
import TaskList from "../components/TaskList.js";
import NonDevPanel from "../components/NonDevPanel.js";
import TimeLog from "../components/TimeLog.js";
import SubmitAllButton from "../components/SubmitAllButton.js";
import { mockActiveTask, mockDayProgress, mockTasks, mockTimeEntries } from "../mocks/data.js";

export default function Dashboard() {
  const pendingCount = mockTimeEntries.filter((e) => !e.synced).length;
  const nonDevTotal = mockTimeEntries
    .filter((e) => e.isNonDev)
    .reduce((s, e) => s + e.durationSeconds, 0);

  return (
    <>
      <TopBar tracked={mockDayProgress.trackedSeconds} goal={mockDayProgress.goalSeconds} />
      <div className="content-scroll">
        <div className="dashboard-grid">
          <ActiveTimer
            jiraKey={mockActiveTask.jiraKey}
            summary={mockActiveTask.summary}
            elapsedSeconds={mockActiveTask.elapsedSeconds}
            running={mockActiveTask.running}
          />
          <DayProgress
            tracked={mockDayProgress.trackedSeconds}
            goal={mockDayProgress.goalSeconds}
            dev={mockDayProgress.devSeconds}
            nonDev={mockDayProgress.nonDevSeconds}
          />

          <div className="full-width">
            <TaskList tasks={mockTasks} />
          </div>

          <NonDevPanel trackedSeconds={nonDevTotal} />
          <TimeLog entries={mockTimeEntries} />

          <div className="full-width">
            <SubmitAllButton pending={pendingCount} />
          </div>
        </div>
      </div>
    </>
  );
}
