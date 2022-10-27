import styles from "./BOTable.module.scss";

interface BOTableProps {
  columns: string[];
  children: any;
  onChange?: (value: string) => void;
}

export const BOTable = (props: BOTableProps) => {
  const { columns, children } = props;

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
