"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogParams } from "@/types";
import { AddPost } from "../actionButtons/AddPost";

export function AddPostDialog({ trigger }: DialogParams) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>
        <AddPost />
      </DialogContent>
    </Dialog>
  );
}
