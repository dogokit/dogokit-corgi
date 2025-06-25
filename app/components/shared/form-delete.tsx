import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { useFetcher, useLocation } from "react-router";

import { ButtonLoading } from "@/components/shared/button-loading";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function FormDelete({
  dialogTrigger,
  action,
  intentValue,
  itemText,
  name = "id",
  defaultValue,
  buttonText = "Delete",
  disabled,
  extraComponent,
  className,
}: {
  dialogTrigger?: React.ReactNode;
  action: string; // Example: /action/user/posts/delete
  intentValue: string; // Example: user-delete-post
  itemText: string; // Example: Post Title
  name?: string; // Optional: Can be with/without input name=id
  defaultValue?: string; // Optional: Can be with/without value
  buttonText?: string;
  disabled?: boolean;
  extraComponent?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>();
  const location = useLocation();
  const fetcher = useFetcher();
  const isSubmitting =
    fetcher.state === "submitting" && fetcher.formMethod === "DELETE";

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild className={className}>
        {dialogTrigger ? (
          dialogTrigger
        ) : (
          <Button disabled={disabled} size="xs" variant="outline">
            <TrashIcon />
            <span>{buttonText}</span>
          </Button>
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemText}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {itemText}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <fetcher.Form
            action={action || location.pathname}
            method="DELETE"
            onSubmit={(event) => {
              fetcher.submit(event.currentTarget.form, { method: "DELETE" });
              setOpen(false);
            }}
          >
            {name && defaultValue && (
              <input defaultValue={defaultValue} name={name} type="hidden" />
            )}

            {extraComponent}

            <ButtonLoading
              isSubmittingOverride={isSubmitting}
              name="intent"
              size="sm"
              submittingText="Deleting"
              type="submit"
              value={intentValue}
              variant="destructive"
            >
              Delete
            </ButtonLoading>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
