import { ITask } from "./../../../../types/tasks";
import { axios } from "./../../../../lib/axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../../app/store";
import { fetchTasksAPI } from "./tasksGridAPI";

export interface TasksState {
  tasks: ITask[];
  status: "idle" | "loading" | "failed";
}

const initialState: TasksState = {
  tasks: [],
  status: "loading",
};

export const tasksGridSlice = createSlice({
  name: "tasksGrid",
  initialState,
  reducers: {
    fetchTasksSuccess(state, action: PayloadAction<ITask[]>) {
      const tasks = action.payload as ITask[];
      state.tasks = tasks;
    },
    fetchTasksFailure(state, action) {
      console.log("Test" + action.payload);
    },
  },
});

export const { fetchTasksSuccess, fetchTasksFailure } = tasksGridSlice.actions;

export const fetchTasks =
  () => async (dispatch: any, getState: () => RootState) => {
    try {
      const response = await fetchTasksAPI();
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

export default tasksGridSlice.reducer;
