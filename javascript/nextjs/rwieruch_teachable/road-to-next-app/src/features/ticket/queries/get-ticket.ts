import { initialTickets } from "@/data";
import { delayQuery } from "@/lib/utils";
import { Ticket } from "../types";

export const getTicket = async (id: string) => {
  await delayQuery();

  const maybeTicket = initialTickets.find((ticket) => ticket.id === id);

  return new Promise<Ticket | null>((resolve) => {
    resolve(maybeTicket || null);
  });
};
