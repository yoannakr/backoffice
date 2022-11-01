import { Input, InputProps } from "antd";

interface Props {
  label?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

type BOInputProps = InputProps & Props;

export const BOInput = (props: BOInputProps) => {
  const onChange = (e: any) => {
    props.onChange && props.onChange(e.target.value);
  };

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <Input
        {...props}
        style={{ width: 250, display: "flex", ...props.style }}
        onChange={onChange}
      />
    </>
  );
};
