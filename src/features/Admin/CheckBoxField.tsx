import React from "react";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface CheckBoxFieldProps<T extends FieldValues> {
  className?: string;
  label: string;
  control: Control<T>;
  name: Path<T>;
}

const CheckBoxField = <T extends FieldValues>({
  className,
  label,
  control,
  name,
}: CheckBoxFieldProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <div className={clsx("flex gap-2", className)}>
      <Checkbox
        id={name}
        onCheckedChange={field.onChange}
        checked={field.value}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};

export default CheckBoxField;
