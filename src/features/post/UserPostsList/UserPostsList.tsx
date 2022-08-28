import React, { useEffect } from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
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

const { Meta } = Card;

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

      <button
        aria-label="Get users"
        onClick={() => dispatch(getUserPostsAsync(userId))}
      >
        Get posts
      </button>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
      <button
        aria-label="Get users"
        onClick={() => {
          const post = { ...posts[1], title: "test" };

          dispatch(editUserPostAsync(post));
        }}
      >
        edit
      </button>
    </div>
  );
};
