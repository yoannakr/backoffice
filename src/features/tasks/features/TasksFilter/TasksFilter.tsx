import { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { BOInput, Row, BOSelect } from "../../../../shared/components";
import { TaskStatusType } from "../../../../types/tasks";
import { fetchTasks } from "../TasksGrid/tasksGridSlice";
import { useUsersOptions } from "./hooks/users/useUsersOptions";
import styles from "./TasksFilter.module.scss";

export const TasksFilter = () => {
  const usersOptions = useUsersOptions();
  const taskStatuses = [
    { label: "Completed", value: TaskStatusType.COMPLETED },
    { label: "Not completed", value: TaskStatusType.NOTCOMPLETED },
  ];

  const [title, setTitle] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [status, setStatus] = useState<TaskStatusType>();

  const dispatch = useAppDispatch();

  const getSelectedStatus = () => {
    if (status) {
      return status === TaskStatusType.COMPLETED ? true : false;
    }

    return undefined;
  };

  const handleTitleChange = (title: any) => {
    const trimmedTitle = title.trim();

    setTitle(trimmedTitle ? trimmedTitle : undefined);
  };

  const handleUserChange = (userId: any) => {
    setUserId(userId);
  };

  const handleStatusChange = (status: any) => {
    setStatus(status);
  };

  const handleTaskSearch = () => {
    dispatch(
      fetchTasks({
        title,
        userId,
        completed: getSelectedStatus(),
      })
    );
  };

  return (
    <div className={styles.FilterContainer}>
      <Row className={styles.Row}>
        <BOInput
          label="Title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </Row>
      <Row className={styles.Row}>
        <BOSelect
          label="User"
          placeholder="User"
          value={userId}
          options={usersOptions}
          onChange={handleUserChange}
        />
      </Row>
      <Row className={styles.Row}>
        <BOSelect
          label="Status"
          placeholder="Status"
          value={status}
          options={taskStatuses}
          onChange={handleStatusChange}
        />
      </Row>
      <button onClick={handleTaskSearch}>Search</button>
    </div>
  );
};
