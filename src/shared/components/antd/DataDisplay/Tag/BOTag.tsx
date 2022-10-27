import { Tag, TagProps } from "antd";

interface Props {
  content?: string;
  style?: React.CSSProperties;
}

type BOTagProps = TagProps & Props;

export const BOTag = (props: BOTagProps) => {
  return (
    <Tag
      {...props}
      style={{
        textAlign: "center",
        minWidth: "max-content",
        width: "100px",
        color: "white",
        border: "none",
        padding: "0.2em",
        ...props.style,
      }}
    >
      {props.children}
    </Tag>
  );
};
