import { Filter, ITask } from "../../../../../types/tasks";

export const isTaskMatchFilter = (task: ITask, filter: Filter): boolean => {
  const { title, userId, status } = filter;
  let isTaskMatchFilter = true;

  if (title) {
    isTaskMatchFilter = task.title.toLowerCase() === title.toLowerCase();
  }

  if (userId) {
    isTaskMatchFilter = isTaskMatchFilter && task.userId === userId;
  }

  if (status !== undefined) {
    isTaskMatchFilter = isTaskMatchFilter && task.isCompleted === status;
  }

  return isTaskMatchFilter;
};
