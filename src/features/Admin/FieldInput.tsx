import React from "react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface FieldInputProps<T extends FieldValues = FieldValues> {
  className?: string;
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
}

const FieldInput = <T extends FieldValues = FieldValues>({
  className,
  control,
  name,
  label = "Role",
  placeholder = "Enter value",
  type = "text",
}: FieldInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div className={clsx("grid gap-3", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        {...field}
        type={type}
        id={name}
        className="max-w-[30rem]"
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FieldInput;
