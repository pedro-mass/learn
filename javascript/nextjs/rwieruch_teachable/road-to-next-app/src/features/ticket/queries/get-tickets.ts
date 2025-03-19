import { prisma } from "@/lib/prisma";

export const getTickets = async () => {
  return prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
