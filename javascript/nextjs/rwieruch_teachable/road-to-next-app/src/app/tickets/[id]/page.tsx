import Link from "next/link";
import { use } from "react";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/paths";

export default function Page(props: { params: Promise<{ id: string }> }) {
  // const { id } = await props.params;
  const { id } = use(props.params);

  console.log({ id });

  const ticket = initialTickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return (
      <Placeholder
        label={`Ticket not found for id: ${id}`}
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go to Tickets</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
