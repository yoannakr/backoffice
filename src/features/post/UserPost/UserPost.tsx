import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteUserPostAsync, selectStatus } from "../postSlice";
import { IPost } from "../../../types/post";
import styles from "./UserPost.module.scss";
import "../../../App.scss";
import { EditUserPost } from "./EditUserPost/EditUserPost";

const { Meta } = Card;

type UserPostOptions = {
  post: IPost;
};

export const UserPost = (props: UserPostOptions) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const { post } = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onError = () => {
    Modal.error({
      title: "Error",
      icon: <ExclamationCircleOutlined />,
      content: `An error occurred while deleting the user post.`,
      centered: true,
      okText: "OK",
    });
  };

  const onDelete = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure delete post with title: ${post.title}?`,
      centered: true,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        await dispatch(deleteUserPostAsync(post.id));
        if (status === "failed") {
          onError();
        }
      },
    });
  };

  return (
    <Card
      className={styles.Card}
      cover={<img alt="card cover" src="https://random.imagecdn.app/500/200" />}
      actions={[
        <EditOutlined key="edit" onClick={() => setIsEditMode(true)} />,
        <DeleteOutlined key="delete" onClick={() => onDelete()} />,
      ]}
    >
      {!isEditMode ? (
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={post.title}
          description={post.body}
        />
      ) : (
        <EditUserPost post={post} onEditModeChange={setIsEditMode} />
      )}
    </Card>
  );
};
