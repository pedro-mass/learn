"use client";

import { Ticket } from "@prisma/client";
import { LucideLoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTicket } from "../actions/upsert-ticket";

export const TicketUpsertForm = (props: { ticket?: Ticket }) => {
  const [isPending, startTransition] = useTransition();

  const upsertTicketAction = (formData: FormData) => {
    startTransition(async () => {
      await upsertTicket.bind(null, props.ticket?.id)(formData);
    });
  };

  return (
    <form action={upsertTicketAction} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={props.ticket?.title}
      />

      <Label htmlFor="content">Content</Label>
      <Input
        id="content"
        name="content"
        type="text"
        defaultValue={props.ticket?.content}
      />

      <Button disabled={isPending} type="submit">
        {isPending && <LucideLoaderCircle className="h-4 w-4 animate-spin" />}
        {props.ticket ? "Edit" : "Create"}
      </Button>
    </form>
  );
};
