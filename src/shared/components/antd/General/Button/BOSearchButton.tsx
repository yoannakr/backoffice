import { Button, ButtonProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const BOSearchButton = (props: ButtonProps) => {
  return (
    <Button {...props} type="primary" icon={<SearchOutlined />} size="large">
      Search
    </Button>
  );
};
