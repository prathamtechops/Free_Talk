import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DialogParams } from "@/types";

function Notification({ trigger }: DialogParams) {
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
