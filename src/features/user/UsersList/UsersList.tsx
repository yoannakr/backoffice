import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { UserDetails } from "../UserDetails/UserDetails";
import { getUsersAsync, selectUsers, selectUserStatus } from "../userSlice";
import "antd/dist/antd.css";
import { Collapse, Spin } from "antd";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";
import { ErrorSvg } from "../../../common/svgs/ErrorSvg";

const { Panel } = Collapse;

export const UsersList = () => {
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <div className={styles.UsersList}>
      {status === "loading" && <Spin size="large" />}
      {status === "idle" && (
        <div className={styles.Container}>
          <h1 className={styles.Title}>Users</h1>
          <Collapse>
            {users.map((user) => (
              <Panel header={user.name} key={user.id}>
                <UserDetails user={user} />
                <Link to={`/userPosts/${user?.id}`}>See Posts</Link>
              </Panel>
            ))}
          </Collapse>
        </div>
      )}
      {status === "failed" && (
        <div className={styles.ErrorContainer}>
          <ErrorSvg width={600} height={500} />
          <h1>Oops an unexpected error occurred</h1>
        </div>
      )}
    </div>
  );
};
