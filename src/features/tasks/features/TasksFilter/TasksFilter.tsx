import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  BOButton,
  BOInput,
  BOSelect,
  Col,
} from "../../../../shared/components";
import { TaskStatusType } from "../../../../types/tasks";
import {
  fetchTasks,
  filterTasks,
  selectTasksHasFetched,
} from "../TasksGrid/tasksGridSlice";
import { useUsersOptions } from "./hooks/users/useUsersOptions";
import styles from "./TasksFilter.module.scss";
import { taskStatuses } from "./taskStatuses";

export const TasksFilter = () => {
  const { usersOptions, loading } = useUsersOptions();
  const dispatch = useAppDispatch();
  const hasFetched = useAppSelector(selectTasksHasFetched);

  const [title, setTitle] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [status, setStatus] = useState<TaskStatusType>();

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

  const handleTaskSearch = async () => {
    if (!hasFetched) {
      await dispatch(fetchTasks());
    }

    dispatch(filterTasks({ title, userId, status: getSelectedStatus() }));
  };

  return (
    <div className={styles.FilterContainer}>
      <div className={styles.FilterFirstRow}>
        <Col className={styles.Row}>
          <BOInput
            label="Title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Col>
        <Col className={styles.Row}>
          <BOSelect
            label="User"
            placeholder="User"
            value={userId}
            options={usersOptions}
            loading={loading}
            onChange={handleUserChange}
          />
        </Col>
        <Col className={styles.Row}>
          <BOSelect
            label="Status"
            placeholder="Status"
            value={status}
            options={taskStatuses}
            onChange={handleStatusChange}
          />
        </Col>
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
