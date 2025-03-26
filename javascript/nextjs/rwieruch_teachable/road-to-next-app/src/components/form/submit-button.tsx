"use client";

import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const SubmitButton = (props: { label: string }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
      {props.label}
    </Button>
  );
};
