import React from "react";

import { TasksFilter } from "./features/TasksFilter/TasksFilter";
import { TasksGrid } from "./features/TasksGrid/TasksGrid";

export const TasksList = () => {
  return (
    <>
      <TasksFilter />
      <TasksGrid />
    </>
  );
};
