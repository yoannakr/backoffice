import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Modal } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { deleteUserPostAsync } from "../postSlice";
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
  const { post } = props;

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onDelete = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete post with title: ${post.title}?`,
      centered: true,
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        dispatch(deleteUserPostAsync(post.id));
      },
    });
  };

  return (
    <Card
      className={styles.Card}
      cover={<img alt="card cover" src="https://random.imagecdn.app/500/150" />}
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
