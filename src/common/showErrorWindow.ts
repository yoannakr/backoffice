import { Modal } from "antd";
import "antd/dist/antd.css";

export const showErrorWindow = (content: string) => {
  Modal.error({
    title: "Error",
    content: content,
    centered: true,
    okText: "OK",
  });
};
