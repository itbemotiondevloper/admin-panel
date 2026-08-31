import React from "react";
import clsx from "clsx";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FormValues } from "./useBlogForm";

interface TagsInputProps {
  className?: string;
}

const TagsInput: React.FC<TagsInputProps> = ({ className }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  return (
    <div className={clsx("max-w-[20rem]", className)}>
      <div className="flex gap-4">
        <Label className="">Tags:</Label>
        <button
          type="button"
          onClick={() => append({ tag: "" })}
          className="inline-flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm text-gray-800 hover:bg-gray-200"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div>
        {fields.map((field, indx) => (
          <div key={field.id} className="mt-2">
            <FieldInput
              placeholder="tag name"
              key={field.id}
              {...register(`tags.${indx}.tag` as const)}
              idx={indx}
              onRemove={() => remove(indx)}
            />
            {errors.tags && errors.tags[indx]?.tag && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tags[indx]?.tag?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {errors.tags && (
        <div className="mt-1 text-sm text-red-600">{errors.tags.message}</div>
      )}
    </div>
  );
};

interface FieldInputProps extends React.ComponentProps<"input"> {
  idx: number;
  onRemove: () => void;
}
const FieldInput: React.FC<FieldInputProps> = ({
  idx,
  placeholder,
  onRemove,
  ...props
}) => {
  return (
    <div key={idx} className="flex items-center gap-2">
      <input
        className="flex-1 rounded border px-3 py-2 text-sm outline-none"
        {...props}
        placeholder={placeholder}
      />
      <button
        type="button"
        aria-label={`Remove item ${idx + 1}`}
        onClick={onRemove}
        className="rounded p-2 text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TagsInput;
