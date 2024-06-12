import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

interface NotificationParams {
  trigger: React.ReactNode;
}

function Notification({ trigger }: NotificationParams) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificaton</SheetTitle>
        </SheetHeader>
        Motification
      </SheetContent>
    </Sheet>
  );
}

export default Notification;
