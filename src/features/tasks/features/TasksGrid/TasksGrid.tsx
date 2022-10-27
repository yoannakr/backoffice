import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { BOPagination, BOSpin } from "../../../../shared/components";
import { ITask } from "../../../../types/tasks";
import { BOTable } from "./components/Table/BOTable";
import { tableColumns } from "./tableColumns";
import { selectFilteredTasks, selectStatus } from "./tasksGridSlice";
import styles from "./TasksGrid.module.scss";
import { TaskGridRow } from "./components/TaskGridRow/TaskGridRow";

export const TasksGrid = () => {
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const status = useAppSelector(selectStatus);
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getTasksToDisplay = (
    tasks: ITask[],
    minIndex: number,
    maxIndex: number
  ): ITask[] => {
    return tasks.filter((_, index) => index >= minIndex && index < maxIndex);
  };

  const displayTasks = useMemo((): ITask[] => {
    const minIndex = (currentPage - 1) * pageSize;
    const maxIndex = currentPage * pageSize;

    return getTasksToDisplay(filteredTasks, minIndex, maxIndex);
  }, [filteredTasks, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTasks]);

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {status === "loading" && (
        <BOSpin className={styles.CenterContainer} size="large" />
      )}
      {status === "idle" && displayTasks.length !== 0 ? (
        <div className={styles.TasksGridContainer}>
          <BOTable columns={tableColumns}>
            {displayTasks.map((task) => (
              <TaskGridRow task={task} key={task.id} />
            ))}
          </BOTable>
          <BOPagination
            pageSize={pageSize}
            currentPage={currentPage}
            totalPages={filteredTasks.length}
            onPaginationChange={onPaginationChange}
            showSizeChanger={false}
          />
        </div>
      ) : (
        <h1 className={styles.CenterContainer}>No data found.</h1>
      )}
      {status === "failed" && (
        <h1 className={styles.CenterContainer}>Error fetching data.</h1>
      )}
    </>
  );
};
