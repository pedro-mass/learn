import Link from "next/link";
import { use } from "react";
import { initialTickets } from "@/data";

export default function Page(props: { params: Promise<{ id: string }> }) {
  // const { id } = await props.params;
  const { id } = use(props.params);

  console.log({ id });

  const ticket = initialTickets.find((ticket) => ticket.id === id);

  if (!ticket) {
    return <div>Ticket not found for id: ${id}</div>;
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>

      <Link href="/tickets" className="text-sm underline">
        Go back to Tickets
      </Link>
    </div>
  );
}
