import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { UserDetails } from "../UserDetails/UserDetails";
import { editUser, getUsersAsync, selectUsers } from "../userSlice";
import "antd/dist/antd.css";
import { Collapse } from "antd";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

export const UsersList = () => {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);

  return (
    <div className={styles.UsersList}>
      <Collapse defaultActiveKey={1}>
        {users.map((user) => (
          <Panel header={user.name} key={user.id}>
            <UserDetails user={user} />
            <Link to={`/userPosts/${user?.id}`}>See Posts</Link>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
