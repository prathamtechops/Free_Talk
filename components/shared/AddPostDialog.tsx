"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddPostModal } from "@/store/addPost.store";
import { DialogParams } from "@/types";
import { AddPost } from "../actionButtons/AddPost";

export function AddPostDialog({ trigger }: DialogParams) {
  const isOpen = useAddPostModal((state) => state.isOpen);
  const setOpen = useAddPostModal((state) => state.toggleDialog);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <AddPost />
      </DialogContent>
    </Dialog>
  );
}
