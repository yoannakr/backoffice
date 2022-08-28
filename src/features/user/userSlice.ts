import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IUser } from "../../types/user";
import { getUsers } from "./userAPI";

export interface UsersState {
  users: IUser[];
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  status: "loading",
};

export const getUsersAsync = createAsyncThunk("users/getUsers", async () => {
  const response = await getUsers();

  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<IUser>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      //making a new array
      const newUsers: IUser[] = [...state.users];

      //changing value in the new array
      newUsers[index] = action.payload;

      return {
        ...state, //copying the orignal state
        users: newUsers, //reassingning todos to new array
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const users: IUser[] = action.payload as IUser[];
        state.users = users;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { editUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;
