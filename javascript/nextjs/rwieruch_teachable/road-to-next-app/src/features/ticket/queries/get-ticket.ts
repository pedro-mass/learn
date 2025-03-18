import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  });
};
