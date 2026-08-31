import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteDialog from "@/features/Admin/DeleteDialog";
import { useRouter } from "next/navigation";
import { postsService } from "@/services/posts.service";
import { PostRecord } from "./BlogList";

interface ActionCellProps {
  className?: string;
  item: PostRecord;
}

const ActionsCell: React.FC<ActionCellProps> = ({ item }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (item._id) {
        await postsService.deletePost(item._id);
        // Reload page to reflect changes
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="flex justify-end">
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                item._id && navigator.clipboard.writeText(item._id)
              }
            >
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/admin/blogs/${item._id}`)}
            >
              Update
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-500 hover:bg-red-950/20">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog
          onDelete={handleDelete}
          name={item.title}
        />
      </AlertDialog>
    </div>
  );
};

export default ActionsCell;
