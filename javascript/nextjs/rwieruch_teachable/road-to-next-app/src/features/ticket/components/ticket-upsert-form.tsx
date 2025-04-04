"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";

export const TicketUpsertForm = (props: { ticket?: Ticket }) => {
  const [actionState, action] = useActionState(
    // @ts-expect-error - bind is broken
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          // @ts-expect-error - typing for payload
          (actionState.payload?.get("title") as string) ?? props.ticket?.title
        }
      />

      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        defaultValue={
          // @ts-expect-error - typing for payload
          (actionState.payload?.get("content") as string) ??
          props.ticket?.content
        }
      />

      <SubmitButton label={props.ticket ? "Edit" : "Create"} />

      {actionState.message}
    </form>
  );
};
