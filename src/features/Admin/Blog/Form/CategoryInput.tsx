"use client";

import * as React from "react";
import { ChevronsUpDown, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export interface ComboboxOption {
  value: string;
  label: string;
}

interface MultiSelectComboboxProps {
  options: ComboboxOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function CategoryInput({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const selectedLabels = options.filter((option) =>
    selected.includes(option.value),
  );

  return (
    <div className={cn("max-w-[30rem]", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          <Button
            type="button"
            variant="outline"
            aria-expanded={open}
            className="h-fit w-full justify-between"
          >
            {selected.length > 0 && (
              <SelectedItems
                selected={selectedLabels}
                placeholder={placeholder}
                onRemove={handleRemove}
              />
            )}
            <PopoverTrigger asChild>
              <div
                className={clsx(
                  "flex flex-1",
                  selected.length === 0 ? "justify-between" : "justify-end",
                )}
              >
                {selected.length === 0 && (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </div>
            </PopoverTrigger>
          </Button>
        </div>

        <ComboBoxContent
          options={options.filter((item) => !selected.includes(item.value))}
          handleSelect={handleSelect}
        />
      </Popover>
    </div>
  );
}

interface SelectedItemsProps {
  selected: ComboboxOption[];
  placeholder?: string;
  onRemove?: (value: string) => void;
}
const SelectedItems: React.FC<SelectedItemsProps> = ({
  selected,
  onRemove,
}) => {
  return (
    <div className="flex flex-wrap gap-1">
      {selected.length !== 0 &&
        selected.map(({ label, value }) => (
          <Badge
            key={value}
            variant="default"
            className="mr-1 flex items-center"
          >
            {label}
            <div onClick={() => onRemove?.(value)}>
              <XIcon className="hover:text-green-400" size={15} />
            </div>
          </Badge>
        ))}
    </div>
  );
};

interface ComboBoxContentProps {
  options: ComboboxOption[];
  handleSelect: (value: string) => void;
}
const ComboBoxContent: React.FC<ComboBoxContentProps> = ({
  options,
  handleSelect,
}) => {
  return (
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search..." />

        <CommandList>
          <CommandEmpty>No items found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
};
