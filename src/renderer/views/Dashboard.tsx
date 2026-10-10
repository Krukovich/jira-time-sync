// libraries
import React from "react";
// components
import TopBar from "@renderer/components/TopBar/TopBar";
import ActiveTimer from "@renderer/components/ActiveTimer/ActiveTimer";
import DayProgress from "@renderer/components/DayProgress/DayProgress";
import TaskList from "@renderer/components/TaskList/TaskList";
import NonDevPanel from "@renderer/components/NonDevPanel/NonDevPanel";
import TimeLog from "@renderer/components/TimeLog/TimeLog";
import SubmitAllButton from "@renderer/components/SubmitAllButton/SubmitAllButton";
// utils
import { mockActiveTask, mockDayProgress, mockTasks, mockTimeEntries } from "../mocks/data.js";

const Dashboard = () => {
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
};

export default Dashboard;
