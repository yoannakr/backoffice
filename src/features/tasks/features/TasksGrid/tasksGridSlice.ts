import { Filter, ITask } from "./../../../../types/tasks";
import { axios } from "./../../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { isTaskMatchFilter } from "./utils/isTaskMatchFilter";
import { isFilterApplied } from "./utils/isFilterApplied";

export interface TasksState {
  hasFetched: boolean;
  tasks: ITask[];
  filteredTasks: ITask[];
  filter: Filter;
  status: "idle" | "loading" | "failed";
}

const initialState: TasksState = {
  hasFetched: false,
  tasks: [],
  filteredTasks: [],
  filter: {},
  status: "idle",
};

export const tasksGridSlice = createSlice({
  name: "tasksGrid",
  initialState,
  reducers: {
    fetchTasksInit(state) {
      state.status = "loading";
    },
    fetchTasksSuccess(state, action) {
      const tasks = action.payload as ITask[];
      state.tasks = tasks;
      state.status = "idle";
      state.hasFetched = true;
    },
    fetchTasksFailure(state, action) {
      state.status = "failed";
    },
    changeTaskStatus(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      const newTasks: ITask[] = [...state.tasks];
      newTasks[index].isCompleted = action.payload.isCompleted;

      state.tasks = newTasks;
      if (isFilterApplied(state.filter)) {
        state.filteredTasks = state.tasks.filter((task: ITask) =>
          isTaskMatchFilter(task, state.filter)
        );
      }
    },
    filterTasks(state, action) {
      const filter = action.payload as Filter;
      state.filter = filter;

      state.filteredTasks = state.tasks.filter((task: ITask) =>
        isTaskMatchFilter(task, filter)
      );
    },
    resetState: () => initialState,
  },
});

export const {
  fetchTasksInit,
  fetchTasksSuccess,
  fetchTasksFailure,
  changeTaskStatus,
  filterTasks,
  resetState,
} = tasksGridSlice.actions;

export const fetchTasks =
  (params?: { title?: string; userId?: number; completed?: boolean }) =>
  async (dispatch: any) => {
    dispatch(fetchTasksInit());
    try {
      const response = await axios.get("/todos", { params: { ...params } });
      const mappedTasks = response.data.map(
        (task: any): ITask => ({
          id: task.id,
          title: task.title,
          userId: task.userId,
          isCompleted: task.completed,
        })
      );

      dispatch(fetchTasksSuccess(mappedTasks));
    } catch (error) {
      dispatch(fetchTasksFailure("Failed to fetch tasks data."));
    }
  };

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectStatus = (state: RootState) => state.tasks.status;
export const selectTasksHasFetched = (state: RootState) =>
  state.tasks.hasFetched;
export const selectFilteredTasks = (state: RootState) =>
  state.tasks.filteredTasks;

export default tasksGridSlice.reducer;
