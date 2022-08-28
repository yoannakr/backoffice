import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import usersReducer from "../features/user/userSlice";
import postsReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
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
