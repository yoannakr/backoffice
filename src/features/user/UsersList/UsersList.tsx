import React, { useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { UserDetails } from "../UserDetails/UserDetails";
import { getUsersAsync, selectUsers, selectUserStatus } from "../userSlice";
import "antd/dist/antd.css";
import { Collapse, Pagination, Spin } from "antd";
import styles from "./UsersList.module.scss";
import { Link } from "react-router-dom";
import { ErrorSvg } from "../../../shared/svgs/ErrorSvg";
import { EmptySvg } from "../../../shared/svgs/EmptySvg";

const { Panel } = Collapse;

export const UsersList = () => {
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectUserStatus);
  const dispatch = useAppDispatch();
  const pageSize = 10;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [minIndex, setMinIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(getUsersAsync()).then(() => {
      setMaxIndex(pageSize);
    });
  }, []);

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  return (
    <div className={styles.UsersList}>
      {status === "loading" && <Spin size="large" />}
      {status === "idle" && users.length !== 0 && (
        <div className={styles.Container}>
          <h1 className={styles.Title}>Users</h1>
          <Collapse>
            {users.map(
              (user, index) =>
                index >= minIndex &&
                index < maxIndex && (
                  <Panel header={user.name} key={user.id}>
                    <UserDetails user={user} />
                    <Link to={`/userPosts/${user?.id}`}>See Posts</Link>
                  </Panel>
                )
            )}
          </Collapse>
          <Pagination
            className={styles.Pagination}
            pageSize={pageSize}
            current={currentPage}
            total={users.length}
            onChange={onPaginationChange}
          />
        </div>
      )}
      {status === "failed" && (
        <div className={styles.ErrorContainer}>
          <ErrorSvg width={600} height={500} />
          <h1>Oops an unexpected error occurred</h1>
        </div>
      )}
      {status === "idle" && users.length === 0 && (
        <div className={styles.ErrorContainer}>
          <EmptySvg width={600} height={500} />
          <h1>No available users</h1>
        </div>
      )}
    </div>
  );
};
