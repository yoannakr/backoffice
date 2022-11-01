import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { TasksFilter } from "./features/TasksFilter/TasksFilter";
import { TasksGrid } from "./features/TasksGrid/TasksGrid";
import { resetState } from "./features/TasksGrid/tasksGridSlice";
import styles from "./TasksList.module.scss";

export const TasksList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.TasksContainer}>
      <h1 className={styles.Title}>Tasks</h1>
      <TasksFilter />
      <TasksGrid />
    </div>
  );
};
