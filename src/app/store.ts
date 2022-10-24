import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../features/user/userSlice";
import postsReducer from "../features/post/postSlice";
import tasksReducer from "../features/tasks/features/TasksGrid/tasksGridSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    tasks: tasksReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
