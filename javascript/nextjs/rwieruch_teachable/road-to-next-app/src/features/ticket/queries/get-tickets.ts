import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types";
import { delayQuery } from "@/lib/utils";

export const getTickets = async () => {
  await delayQuery();

  return new Promise<Ticket[]>((resolve) => {
    resolve(initialTickets);
  });
};
