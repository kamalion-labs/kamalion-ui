import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { cn } from "../../util";
import type {
  TableCellProps,
  TableContainerProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
} from "./types";

function TableContainer({ className, ref, ...props }: TableContainerProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "table-container w-full overflow-x-auto rounded-(--radius-card) border border-(--color-surface-panel-border)",
        className,
      )}
      {...props}
    />
  );
}

function TableRoot({ className, ref, ...props }: TableProps) {
  return (
    <table
      ref={ref}
      className={cn(
        "table w-full border-collapse text-left text-sm text-(--color-foreground)",
        className,
      )}
      {...props}
    />
  );
}

function TableHeader({ className, ref, ...props }: TableSectionProps) {
  return (
    <thead
      ref={ref}
      className={cn(
        "table-header border-b border-(--color-border) bg-(--color-surface-panel-muted)",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ref, ...props }: TableSectionProps) {
  return (
    <tbody
      ref={ref}
      className={cn("table-body divide-y divide-(--color-border)", className)}
      {...props}
    />
  );
}

function TableRow({ className, ref, ...props }: TableRowProps) {
  return (
    <tr
      ref={ref}
      className={cn(
        "table-row transition-colors hover:bg-(--color-surface-panel-muted)",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({
  sortable,
  sortDirection = false,
  onSort,
  className,
  children,
  ref,
  ...props
}: TableHeadProps) {
  const SortIcon =
    sortDirection === "asc"
      ? ChevronUp
      : sortDirection === "desc"
        ? ChevronDown
        : ChevronsUpDown;

  return (
    <th
      ref={ref}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : undefined
      }
      className={cn(
        "table-head px-4 py-3 font-medium text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className="inline-flex items-center gap-1 transition-colors hover:text-(--color-foreground)"
        >
          {children}
          <SortIcon className="size-3.5" />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

function TableCell({ className, ref, ...props }: TableCellProps) {
  return (
    <td
      ref={ref}
      className={cn("table-cell px-4 py-3 align-middle", className)}
      {...props}
    />
  );
}

function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  className,
  ref,
  ...props
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const navBtn =
    "rounded-(--radius-card) border border-(--color-border) px-3 py-1.5 text-sm transition-colors hover:bg-(--color-surface-panel-muted) disabled:pointer-events-none disabled:opacity-50";

  return (
    <div
      ref={ref}
      className={cn(
        "table-pagination flex items-center justify-between gap-4 px-1 py-3 text-sm text-(--color-foreground-muted)",
        className,
      )}
      {...props}
    >
      <span>
        {from}–{to} of {total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={navBtn}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <span className="text-(--color-foreground)">
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className={navBtn}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/**
 * Data table primitives for tabular data.
 */
export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Container: TableContainer,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Pagination: TablePagination,
});

export type * from "./types";
