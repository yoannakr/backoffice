import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Col, Form, Input, Row } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { editUserPostAsync, selectStatus } from "../../postSlice";
import { IPost } from "../../../../types/post";
import styles from "./EditUserPost.module.scss";
import "../../../../App.scss";
import TextArea from "antd/lib/input/TextArea";
import { showErrorWindow } from "../../../../shared/showErrorWindow";

type EditUserPostOptions = {
  post: IPost;
  onEditModeChange: (editMode: boolean) => void;
};

export const EditUserPost = (props: EditUserPostOptions) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const { post, onEditModeChange } = props;

  const [title, setTitle] = useState<string>(post.title);
  const [body, setBody] = useState<string>(post.body);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit = async () => {
    const newUserPost: IPost = {
      id: post.id,
      title: title,
      body: body,
    };

    setIsSaving(true);
    await dispatch(editUserPostAsync(newUserPost));
    if (status === "failed") {
      showErrorWindow("An error occurred while updating the user post.");
    } else {
      onEditModeChange(false);
    }
    setIsSaving(false);
  };

  const onCancel = () => {
    onEditModeChange(false);
  };

  return (
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
  );
};
