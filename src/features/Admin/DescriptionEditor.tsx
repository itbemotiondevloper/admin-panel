import React from "react";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import RichEditor from "@/components/rich-text-editor/RichEditor";
import { Control, useController, Path, FieldValues } from "react-hook-form";
import { JSONContent } from "@tiptap/react";

interface DescriptionEditorProps<T extends FieldValues = FieldValues> {
  className?: string;
  onValueChange?: (content: JSONContent) => void;
  control: Control<T>;
  label?: string;
  name: Path<T>;
  notionMode?: boolean;
  editable?: boolean;
  onRawValueChange?: (text: string) => void;
}

const DescriptionEditor = <T extends FieldValues = FieldValues>({
  className,
  onValueChange,
  control,
  name,
  label = "Description",
  notionMode = false,
  editable = true,
  onRawValueChange,
}: DescriptionEditorProps<T>) => {
  const { field, fieldState } = useController<T>({
    control: control as unknown as Control<T>,
    name: name,
    rules: { required: "Description is required" },
  });

  return (
    <div className={clsx("", className)}>
      <div>
        {label && (
          <Label htmlFor="description" className="mb-2">
            {label}
          </Label>
        )}
        <RichEditor
          defaultValue={field.value}
          onRawValueChange={(text) => {
            field.onChange(text);
            if (onRawValueChange) onRawValueChange(text);
          }}
          onValueChange={onValueChange}
          notionMode={notionMode}
          editable={editable}
        />
        {fieldState.error && (
          <p className="mt-1 text-sm text-red-600">
            {fieldState.error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DescriptionEditor;
