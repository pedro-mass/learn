import { Ticket } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { upsertTicket } from "../actions/upsert-ticket";

export const TicketUpsertForm = (props: { ticket?: Ticket }) => {
  return (
    <form
      action={upsertTicket.bind(null, props.ticket?.id)}
      className="flex flex-col gap-y-2"
    >
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

      <Button type="submit">{props.ticket ? "Edit" : "Create"}</Button>
    </form>
  );
};
