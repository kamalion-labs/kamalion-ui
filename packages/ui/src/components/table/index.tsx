import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "../button";
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
        // `bg-*` so the header isn't the only opaque band in the container —
        // without it the table reads as a floating header over the page.
        "table-container w-full overflow-x-auto rounded-(--radius-card) border border-(--color-surface-panel-border) bg-(--color-surface-panel)",
        className,
      )}
      {...props}
    />
  );
}

function TableRoot({ density = "default", className, ref, ...props }: TableProps) {
  return (
    <table
      ref={ref}
      data-density={density}
      className={cn(
        "table group/table w-full border-collapse text-left text-sm text-(--color-foreground)",
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
        // Header sits on the PANEL surface and hovered rows on panel-muted.
        // The reverse (which this was) made a hovered row the exact colour of
        // the header, so the header stopped reading as a header.
        // `sticky` also delivers the theme's pinned-header gesture for free
        // whenever the container scrolls.
        "table-header sticky top-0 z-10 border-b border-(--color-border) bg-(--color-surface-panel)",
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
        "data-[selected]:bg-(--color-accent-subtle)",
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
        // The "Caption / Small" treatment from DESIGN.md §3 — uppercase at a
        // wider tracking is what makes a table read as a table at a glance,
        // and it visually separates the header band from the data below it.
        "table-head px-4 py-2.5 text-caption font-medium tracking-wider text-(--color-foreground-subtle) uppercase",
        "first:pl-5 last:pr-5",
        "group-data-[density=compact]/table:py-1.5",
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            "group inline-flex cursor-pointer items-center gap-1 rounded-(--radius-inline) transition-colors",
            "hover:text-(--color-foreground)",
            "outline-none focus-ring",
          )}
        >
          {children}
          {/* Idle columns keep the affordance hidden — a full-opacity chevron
              on every column is pure noise on a dense table. */}
          <SortIcon
            className={cn(
              "size-3.5 shrink-0 transition-opacity",
              sortDirection
                ? "text-(--color-accent) opacity-100"
                : "opacity-0 group-hover:opacity-60 group-focus-visible:opacity-100",
            )}
          />
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
      className={cn(
        "table-cell px-4 py-2.5 align-middle first:pl-5 last:pr-5",
        "group-data-[density=compact]/table:py-1.5",
        className,
      )}
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
        <span className="font-medium text-(--color-foreground)">
          {from}–{to}
        </span>{" "}
        of {total}
      </span>
      <div className="flex items-center gap-2">
        {/* Reuses the real Button rather than a local class string, so
            pagination inherits the system's geometry, focus and motion. */}
        <Button
          variant="outline"
          size="sm"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <span className="tabular-nums text-(--color-foreground)">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
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
