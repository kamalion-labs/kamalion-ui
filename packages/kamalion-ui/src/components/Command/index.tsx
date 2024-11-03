import { CommandInput } from "./CommandInput";
import { CommandRoot } from "./CommandRoot";
import { CommandShortcut } from "./CommandShortcut";
import { CommandSeparator } from "./CommandSeparator";
import { CommandGroup } from "./CommandGroup";
import { CommandList } from "./CommandList";
import { CommandEmpty } from "./CommandEmpty";
import { CommandItem } from "./CommandItem";

export const Command = {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
};
