import { ITask } from "./../../../../types/tasks";
import { axios } from "./../../../../lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";

export interface TasksState {
  tasks: ITask[];
  filteredTasks: ITask[];
  status: "idle" | "loading" | "failed";
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  status: "loading",
};

export const tasksGridSlice = createSlice({
  name: "tasksGrid",
  initialState,
  reducers: {
    fetchTasksSuccess(state, action) {
      const tasks = action.payload as ITask[];
      state.tasks = tasks;
    },
    fetchTasksFailure(state, action) {
      //TODO:
      console.log("Test" + action.payload);
    },
    setFilteredTasks(state, action) {
      state.filteredTasks = action.payload as ITask[];
    },
    changeTaskStatus(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      //making a new array
      const newTasks: ITask[] = [...state.tasks];

      //changing value in the new array
      newTasks[index].isCompleted = action.payload.isCompleted;

      state.tasks = newTasks;
    },
  },
});

export const {
  fetchTasksSuccess,
  fetchTasksFailure,
  setFilteredTasks,
  changeTaskStatus,
} = tasksGridSlice.actions;

export const fetchTasks =
  (params?: { title?: string; userId?: number; completed?: boolean }) =>
  async (dispatch: any, getState: () => RootState) => {
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
export const selectFilteredTasks = (state: RootState) =>
  state.tasks.filteredTasks;

export default tasksGridSlice.reducer;
