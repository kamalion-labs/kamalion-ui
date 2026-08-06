import { cn } from "../../util";
import type { CodeBlockProps, CodeInlineProps } from "./types";

function CodeInline({ className, children, ref, ...props }: CodeInlineProps) {
  return (
    <code
      ref={ref}
      className={cn(
        "code-inline relative rounded-(--radius-card) bg-(--color-surface-panel-muted) px-1.5 py-0.5 font-mono text-sm text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

function CodeBlock({
  className,
  classNameCode,
  children,
  ref,
  ...props
}: CodeBlockProps) {
  return (
    <pre
      ref={ref}
      className={cn(
        "code-block overflow-x-auto rounded-(--radius-panel) border border-(--color-surface-panel-border) bg-(--color-surface-panel-muted) p-4 text-sm text-(--color-foreground)",
        className,
      )}
      {...props}
    >
      <code className={cn("font-mono", classNameCode)}>{children}</code>
    </pre>
  );
}

/**
 * Text container for formatted code snippets. `Code.Inline` is a single-line
 * badge; `Code.Block` is a multi-line monospaced block.
 */
export const Code = Object.assign(CodeInline, {
  Inline: CodeInline,
  Block: CodeBlock,
});

export type * from "./types";
