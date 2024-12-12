import { initialTickets } from "@/data";
import { Ticket } from "@/features/ticket/types";

export const getTickets = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise<Ticket[]>((resolve) => {
    resolve(initialTickets);
  });
};
