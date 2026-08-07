import { useRef, useState, type ReactNode } from "react";
import { File as FileIcon, Trash2, UploadCloud } from "lucide-react";
import { cn } from "../../../util";
import { useInputField } from "../hooks";
import { FieldError } from "../shared";

export interface InputFileProps {
  value?: File[];
  onValueChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  children?: ReactNode;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function InputFileRoot({
  value,
  onValueChange,
  accept,
  multiple = true,
  className,
  children,
}: InputFileProps) {
  const field = useInputField<File[]>({ value, onValueChange });
  const files = field.value ?? [];
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    field.setValue(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const removeAt = (index: number) => {
    field.setValue(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        aria-invalid={field.invalid || undefined}
        className={cn(
          // `border` not `border-2`: a 2px dashed outline is the classic
          // unfinished-upload-widget tell. A single dash at a stronger colour
          // reads as intentional.
          "input-file flex cursor-pointer flex-col items-center justify-center gap-2 rounded-(--radius-card) border border-dashed border-(--color-border-hover) bg-(--color-surface-panel-muted) p-6 text-center",
          "transition-[border-color,background-color,transform] ease-standard outline-none",
          "hover:border-(--color-accent) hover:bg-(--color-accent-subtle)",
          "focus-ring",
          dragging && "scale-[0.995] border-(--color-accent) bg-(--color-accent-soft)",
          field.invalid && "border-(--color-danger)",
          className,
        )}
      >
        <UploadCloud className="size-6 text-(--color-foreground-subtle)" />
        <span className="text-sm text-(--color-foreground-muted)">
          Drag &amp; drop or{" "}
          <span className="font-medium text-(--color-accent)">browse</span>
        </span>
        <input
          ref={inputRef}
          id={field.id}
          name={field.name}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={field.disabled}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {children ?? (
        <InputFileList>
          {files.map((file, index) => (
            <InputFileItem key={`${file.name}-${index}`}>
              <InputFileItemIcon />
              <InputFileItemName>
                {file.name}
                <span className="ml-2 text-xs text-(--color-foreground-subtle)">
                  {formatSize(file.size)}
                </span>
              </InputFileItemName>
              <InputFileItemDelete onClick={() => removeAt(index)} />
            </InputFileItem>
          ))}
        </InputFileList>
      )}

      <FieldError error={field.error} />
    </>
  );
}

function InputFileList({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <ul className={cn("mt-2 flex flex-col gap-1.5", className)}>{children}</ul>;
}

function InputFileItem({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-(--radius-control) border border-(--color-border) bg-(--color-surface-panel) px-3 py-2 text-sm",
        "animate-in fade-in-0 slide-in-from-top-1 duration-(--duration-fast) ease-standard",
        className,
      )}
    >
      {children}
    </li>
  );
}

function InputFileItemIcon({ className }: { className?: string }) {
  return (
    <FileIcon
      className={cn("size-4 shrink-0 text-(--color-foreground-subtle)", className)}
      aria-hidden="true"
    />
  );
}

function InputFileItemName({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={cn("flex-1 truncate text-(--color-foreground)", className)}>
      {children}
    </span>
  );
}

function InputFileProgress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "h-1.5 w-24 overflow-hidden rounded-(--radius-pill) bg-(--color-surface-panel-muted)",
        className,
      )}
    >
      <span
        className="block h-full rounded-(--radius-pill) bg-(--color-accent) transition-[width]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </span>
  );
}

function InputFileItemDelete({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Remove file"
      onClick={onClick}
      className={cn(
        "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-(--radius-inline) text-(--color-foreground-subtle) transition-colors",
        "hover:bg-(--color-danger-soft) hover:text-(--color-danger)",
        "outline-none focus-ring",
        className,
      )}
    >
      <Trash2 className="size-4" />
    </button>
  );
}

export const InputFile = Object.assign(InputFileRoot, {
  List: InputFileList,
  Item: InputFileItem,
  ItemIcon: InputFileItemIcon,
  ItemName: InputFileItemName,
  Progress: InputFileProgress,
  ItemDelete: InputFileItemDelete,
});
