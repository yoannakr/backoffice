import { Button, ButtonProps } from "antd";

interface Props {
  content?: string;
}

type BOButtonProps = ButtonProps & Props;

export const BOButton = (props: BOButtonProps) => {
  return (
    <Button size="large" {...props}>
      {props.content}
    </Button>
  );
};
