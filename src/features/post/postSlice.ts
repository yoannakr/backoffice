import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IPost } from "../../types/post";
import { getUserPosts, editUserPost, deleteUserPost } from "./postAPI";

export interface PostsState {
  posts: IPost[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
};

export const getUserPostsAsync = createAsyncThunk(
  "posts/getPosts",
  async (userId: number) => {
    const response = await getUserPosts({ userId });

    return response.data;
  }
);

export const editUserPostAsync = createAsyncThunk(
  "posts/editUserPost",
  async (userPost: IPost) => {
    const response = await editUserPost({ userPost });

    return response.data;
  }
);

export const deleteUserPostAsync = createAsyncThunk(
  "posts/deleteUserPost",
  async (userPostId: number) => {
    await deleteUserPost({ userPostId });

    return userPostId;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const posts: IPost[] = action.payload as IPost[];
        state.posts = posts;
      })
      .addCase(getUserPostsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editUserPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserPostAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const updatedUserPost = action.payload as IPost;
        const index = state.posts.findIndex(
          (post) => post.id === updatedUserPost.id
        );

        const newPosts: IPost[] = [...state.posts];
        newPosts[index] = action.payload;

        state.posts = newPosts;
      })
      .addCase(editUserPostAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteUserPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserPostAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const newPosts: IPost[] = state.posts.filter(
          (post) => post.id !== action.payload
        );

        state.posts = newPosts;
      })
      .addCase(deleteUserPostAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
