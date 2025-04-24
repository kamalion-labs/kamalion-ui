import { ReactNode } from "react";
export type PageRootProps = {
    isLoading?: boolean;
    children: ReactNode;
};
export declare function PageRoot({ children, isLoading }: PageRootProps): import("react/jsx-runtime").JSX.Element;
