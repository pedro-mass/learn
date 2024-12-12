import { Suspense } from "react";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "../../features/ticket/components/ticket-list";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Tickets" description="All your tickets at one place" />

      <Spinner />

      {/* <Suspense fallback={<Spinner />}>
        <TicketList />
      </Suspense> */}
    </div>
  );
}
