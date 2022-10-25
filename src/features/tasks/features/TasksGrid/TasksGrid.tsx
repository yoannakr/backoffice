import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { BOPagination } from "../../../../shared/components/antd/Navigation/Pagination/BOPagination";
import { BOTable } from "./components/Table/BOTable";
import { fetchTasks, selectTasks } from "./tasksGridSlice";

export const TasksGrid = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  const onPaginationChange = (page: number) => {};
  const tableColumns = ["Id", "Title", "User", "Status"];

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BOTable columns={tableColumns}>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.userId}</td>
            <td>{task.isCompleted.toString()}</td>
          </tr>
        ))}
      </BOTable>
      <BOPagination
        pageSize={1}
        currentPage={1}
        totalPages={30}
        onPaginationChange={onPaginationChange}
      />
    </div>
  );
};
