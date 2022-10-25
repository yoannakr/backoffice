import styles from "./BOTable.module.scss";

interface BOTableProps {
  columns: string[];
  children: any;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

export const BOTable = (props: BOTableProps) => {
  const { columns, children, style } = props;

  //TODO: {...style}
  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
