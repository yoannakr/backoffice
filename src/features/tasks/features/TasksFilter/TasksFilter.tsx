import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { BOInput, Row, BOSelect } from "../../../../shared/components";
import { ITask, TaskStatusType } from "../../../../types/tasks";
import {
  setFilteredTasks,
  selectTasks,
  fetchTasks,
} from "../TasksGrid/tasksGridSlice";
import { useUsersOptions } from "./hooks/users/useUsersOptions";
import { taskStatuses } from "./taskStatuses";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./TasksFilter.module.scss";
import { BOButton } from "../../../../shared/components";

export const TasksFilter = () => {
  const { usersOptions, loading } = useUsersOptions();

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const [title, setTitle] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [status, setStatus] = useState<TaskStatusType>();

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const filteredTasks = getFilteredTasks(tasks);

    dispatch(setFilteredTasks(filteredTasks));
    // eslint-disable-next-line
  }, [tasks]);

  const isTaskMatchFilter = (task: ITask): boolean => {
    let isTaskMatchFilter = true;

    if (title) {
      isTaskMatchFilter = task.title.toLowerCase() === title.toLowerCase();
    }

    if (userId) {
      isTaskMatchFilter = isTaskMatchFilter && task.userId === userId;
    }

    if (status) {
      isTaskMatchFilter =
        isTaskMatchFilter && task.isCompleted === getSelectedStatus();
    }

    return isTaskMatchFilter;
  };

  const getFilteredTasks = (tasks: ITask[]): ITask[] => {
    const filteredTasks = tasks.filter((task: ITask) =>
      isTaskMatchFilter(task)
    );

    return filteredTasks;
  };

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
    const filteredTasks = getFilteredTasks(tasks);

    dispatch(setFilteredTasks(filteredTasks));
  };

  return (
    <div className={styles.FilterContainer}>
      <div className={styles.FilterFirstRow}>
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
            loading={loading}
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
      </div>
      <BOButton
        icon={<SearchOutlined />}
        style={{
          background: "rgb(179 171 149)",
          borderColor: "transparent",
          color: "white",
        }}
        content={"Search"}
        onClick={handleTaskSearch}
      />
    </div>
  );
};
