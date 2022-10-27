import { TasksFilter } from "./features/TasksFilter/TasksFilter";
import { TasksGrid } from "./features/TasksGrid/TasksGrid";
import styles from "./TasksList.module.scss";

export const TasksList = () => {
  return (
    <div className={styles.TasksContainer}>
      <h1 className={styles.Title}>Tasks</h1>
      <TasksFilter />
      <TasksGrid />
    </div>
  );
};
