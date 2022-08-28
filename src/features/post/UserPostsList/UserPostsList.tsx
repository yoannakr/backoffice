import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getUserPostsAsync,
  editUserPostAsync,
  selectPosts,
} from "../postSlice";
import { UserDetails } from "../../user/UserDetails/UserDetails";
import { selectUsers } from "../../user/userSlice";
import { UserPost } from "../UserPost/UserPost";

export const UserPostsList = () => {
  const params = useParams();
  const userId: number = params.userId !== undefined ? +params.userId : 0;
  const user = useAppSelector(selectUsers).find((user) => user.id === userId);

  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserPostsAsync(userId));
  }, []);

  return (
    <div>
      <UserDetails user={user} />
      {posts.map((post) => (
        <UserPost key={post.id} post={post} />
      ))}
    </div>
  );
};
