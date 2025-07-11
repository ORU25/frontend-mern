import { LIMIT_LISTS } from "@/constans/list.constant";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { on } from "events";
import { div } from "framer-motion/client";
import { ChangeEvent, Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";

interface PropTypes {
  buttonTopContentLabel?: string;
  currentPage: number;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  totalPages: number;
  limit: string;
  isLoading?: boolean;
  emptyContent: string;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangePage: (page: number) => void;
  onClearSearch: () => void;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickButtonTopContent?: () => void;
}

const DataTable = (props: PropTypes) => {
  const {
    buttonTopContentLabel,
    columns,
    data,
    limit,
    emptyContent,
    isLoading,
    renderCell,
    onClearSearch,
    onChangeLimit,
    onChangeSearch,
    onClickButtonTopContent,
    totalPages,
    currentPage,
    onChangePage,
  } = props;

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={onClearSearch}
          onChange={onChangeSearch}
        />
        {buttonTopContentLabel && (
          <Button color="danger" onPress={onClickButtonTopContent}>
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    onChangeSearch,
    onClearSearch,
    onClickButtonTopContent,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        <Select
          className="hidden max-w-36 lg:block"
          size="md"
          selectedKeys={[limit]}
          selectionMode="single"
          onChange={onChangeLimit}
          startContent={<p className="text-small">Show:</p>}
          disallowEmptySelection
        >
          {LIMIT_LISTS.map((item) => (
            <SelectItem key={item.value}>{item.label}</SelectItem>
          ))}
        </Select>
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            color="danger"
            page={currentPage}
            total={totalPages}
            onChange={onChangePage}
            loop
          />
        )}
      </div>
    );
  }, [limit, onChangeLimit, currentPage, totalPages, onChangePage]);

  return (
    <Table
      topContent={TopContent}
      topContentPlacement="outside"
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      classNames={{ 
        base: "max-w-full",
        wrapper: cn({"overflow-x-hidden": isLoading})
       }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data}
        emptyContent={emptyContent}
        isLoading={isLoading}
        loadingContent={<div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-sm">
            <Spinner color="danger"/>
        </div>}
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
