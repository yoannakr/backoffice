import { Select, SelectProps } from "antd";

interface Props {
  label?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

type BOSelectProps = SelectProps & Props;

export const BOSelect = (props: BOSelectProps) => {
  const onChange = (value: any) => {
    props.onChange && props.onChange(value);
  };

  return (
    <>
      {props.label && <label>{props.label}</label>}
      <Select
        allowClear
        showSearch
        optionFilterProp={"label"}
        {...props}
        style={{ width: 250, display: "flex", ...props.style }}
        onChange={onChange}
      />
    </>
  );
};
