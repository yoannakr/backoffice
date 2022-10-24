import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { BOPagination } from "../../../../shared/components/antd/Navigation/Pagination/BOPagination";
import { fetchTasks, selectTasks } from "./tasksGridSlice";

export const TasksGrid = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const onPaginationChange = (page: number) => {};

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <h1 key={task.id}>{task.title}</h1>
      ))}
      <p>Grid</p>
      <BOPagination
        pageSize={1}
        currentPage={1}
        totalPages={30}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
};
