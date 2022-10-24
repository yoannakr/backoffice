import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUserPostsAsync, selectPosts, selectStatus } from "../postSlice";
import { UserDetails } from "../../user/UserDetails/UserDetails";
import { selectUsers } from "../../user/userSlice";
import { UserPost } from "../UserPost/UserPost";
import { IUser } from "../../../types/user";
import { getUser } from "../../user/userAPI";
import styles from "./UserPostsList.module.scss";
import { Space, Spin } from "antd";
import { EmptySvg } from "../../../shared/svgs/EmptySvg";
import { ErrorSvg } from "../../../shared/svgs/ErrorSvg";

export const UserPostsList = () => {
  const params = useParams();
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<IUser>();

  const userId: number = params.userId !== undefined ? +params.userId : 0;
  let userStore = useAppSelector(selectUsers).find(
    (user) => user.id === userId
  );
  const getUserAsync = async () => {
    return await getUser({ userId });
  };

  useEffect(() => {
    if (userStore === undefined) {
      getUserAsync().then((response) => {
        const user: IUser = response.data as IUser;
        setUser(user);
      });
    } else {
      setUser(userStore);
    }

    dispatch(getUserPostsAsync(userId));
  }, []);

  return (
    <div className={styles.Container}>
      {status === "loading" && <Spin size="large" />}
      {status === "idle" && user !== undefined && (
        <div className={styles.UserPostsList}>
          <h1 className={styles.Title}>User Details</h1>
          <div className={styles.UserDetails}>
            <UserDetails user={user} />
          </div>
          {posts.length === 0 ? (
            <div className={styles.ErrorContainer}>
              <EmptySvg width={600} height={500} />
              <h1>No available posts</h1>
            </div>
          ) : (
            <div>
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
          )}
        </div>
      )}
      {status === "failed" && (
        <div className={styles.ErrorContainer}>
          <ErrorSvg width={600} height={500} />
          <h1>Oops an unexpected error occurred</h1>
        </div>
      )}
      {status === "idle" && user === undefined && (
        <div className={styles.ErrorContainer}>
          <EmptySvg width={600} height={500} />
          <h1>User not exist</h1>
        </div>
      )}
    </div>
  );
};
