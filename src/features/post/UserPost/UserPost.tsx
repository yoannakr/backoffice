import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, Modal, Row } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { editUserPostAsync, deleteUserPostAsync } from "../postSlice";
import { IPost } from "../../../types/post";
import styles from "./UserPost.module.scss";
import "../../../App.scss";
import TextArea from "antd/lib/input/TextArea";

const { Meta } = Card;

type UserPostOptions = {
  post: IPost;
};

export const UserPost = (props: UserPostOptions) => {
  const dispatch = useAppDispatch();
  const { post } = props;

  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit = async () => {
    const newUserPost: IPost = {
      id: post.id,
      title: title,
      body: body,
    };

    setIsSaving(true);
    await dispatch(editUserPostAsync(newUserPost));
    setIsEditMode(false);
    setIsSaving(false);
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const onDelete = () => {
    Modal.confirm({
      title: "Warning",
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete post with title: ${title}?`,
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
      style={{
        width: 400,
      }}
      cover={<img alt="example" src="https://random.imagecdn.app/500/150" />}
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
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
          labelAlign={"left"}
          initialValues={{ ...post }}
        >
          <Form.Item name="title" label="Title">
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Item>
          <Form.Item name="body" label="Description">
            <TextArea
              rows={5}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </Form.Item>
          <Row gutter={24}>
            <Col sm={{ offset: 7, span: 6 }}>
              <Form.Item>
                <Button
                  className={styles.Button}
                  type="primary"
                  onClick={onSubmit}
                  loading={isSaving}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  className={`${styles.Button} ${styles.CancelButton}`}
                  type="primary"
                  onClick={onCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Card>
  );
};
