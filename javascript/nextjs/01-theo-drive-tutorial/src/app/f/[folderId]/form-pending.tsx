"use client";

import type React from "react";
import { useFormStatus } from "react-dom";
import { cn } from "~/lib/utils";

export function FormPending({
  children,
  dimClass = "opacity-50",
}: {
  children: React.ReactNode;
  dimClass?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <div
      className={cn({
        [dimClass]: pending,
        "pointer-events-none": pending,
      })}
      aria-busy={pending}
    >
      {children}
    </div>
  );
}
