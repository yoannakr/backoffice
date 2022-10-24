import { Pagination, PaginationProps } from "antd";

interface Props {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  onPaginationChange(page: number): void;
}

type BOPaginationProps = PaginationProps & Props;

export const BOPagination = (props: BOPaginationProps) => {
  const { pageSize, currentPage, totalPages, onPaginationChange } = props;

  return (
    <Pagination
      {...props}
      pageSize={pageSize}
      current={currentPage}
      total={totalPages}
      onChange={onPaginationChange}
    />
  );
};
