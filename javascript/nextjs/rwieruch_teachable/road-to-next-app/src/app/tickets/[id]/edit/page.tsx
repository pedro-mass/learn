import { notFound } from "next/navigation";
import { CardCompact } from "@/components/card-compact";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

const TicketEditPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const awaitedParams = await params;
  console.log({ fn: "<TicketEditPage", awaitedParams });
  const { id } = awaitedParams;

  const ticket = await getTicket(id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
