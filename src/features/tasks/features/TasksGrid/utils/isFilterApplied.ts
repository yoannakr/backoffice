import { Filter } from "../../../../../types/tasks";

export const isFilterApplied = (filter: Filter): boolean => {
  const { title, userId, status } = filter;
  if (title || userId || status) {
    return true;
  }

  return false;
};
