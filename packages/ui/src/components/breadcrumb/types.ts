import type React from "react";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Separator rendered between items. Defaults to a chevron icon. */
  separator?: React.ReactNode;
  className?: string;
  classNameList?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

export interface BreadcrumbItemProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLLIElement>;
}

export interface BreadcrumbLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
}

export interface BreadcrumbCurrentProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLSpanElement>;
}
