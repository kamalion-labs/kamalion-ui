import type React from "react";

export type SortDirection = "asc" | "desc" | false;

/** Row height. `compact` trims ~8px per row for genuinely dense views. */
export type TableDensity = "default" | "compact";

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  density?: TableDensity;
  className?: string;
  ref?: React.Ref<HTMLTableElement>;
}

export interface TableSectionProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  ref?: React.Ref<HTMLTableSectionElement>;
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  ref?: React.Ref<HTMLTableRowElement>;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: SortDirection;
  onSort?: () => void;
  className?: string;
  ref?: React.Ref<HTMLTableCellElement>;
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
  ref?: React.Ref<HTMLTableCellElement>;
}

export interface TableContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export interface TablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}
