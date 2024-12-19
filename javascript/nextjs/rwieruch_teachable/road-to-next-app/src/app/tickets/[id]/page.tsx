import { notFound } from "next/navigation";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const ticket = await getTicket(id);

  if (!ticket) {
    return notFound();
  }

  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}
