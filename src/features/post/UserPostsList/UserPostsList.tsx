import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUserPostsAsync, selectPosts } from "../postSlice";
import { UserDetails } from "../../user/UserDetails/UserDetails";
import { selectUsers } from "../../user/userSlice";
import { UserPost } from "../UserPost/UserPost";
import { IUser } from "../../../types/user";
import { getUser } from "../../user/userAPI";
import styles from "./UserPostsList.module.scss";
import { Space } from "antd";

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
    <div className={styles.Container}>
      <h1 className={styles.Title}>User Details</h1>
      <div className={styles.UserDetails}>
        <UserDetails user={user} />
      </div>
      <h1 className={styles.Title}>User Posts</h1>
      <Space
        className={styles.UserPosts}
        direction="horizontal"
        wrap={true}
        align={"center"}
        size="large"
      >
        {posts.map((post) => (
          <UserPost key={post.id} post={post} />
        ))}
      </Space>
    </div>
  );
};
