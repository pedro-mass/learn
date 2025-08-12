"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

export function DeleteSubmitButton({ "aria-label": ariaLabel = "Delete" }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      aria-label={ariaLabel}
      disabled={pending}
    >
      {pending ? (
        <Loader2Icon size={20} className="animate-spin" />
      ) : (
        <Trash2Icon size={20} />
      )}
    </Button>
  );
}
