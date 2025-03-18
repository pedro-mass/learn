import { PrismaClient, Ticket } from "@prisma/client";

const prisma = new PrismaClient();

export const initialTickets: Omit<Ticket, "id" | "createdAt" | "updatedAt">[] =
  [
    {
      // id: "1",
      title: "Ticket 1",
      content: "This is the first ticket.",
      status: "DONE",
    },
    {
      // id: "2",
      title: "Ticket 2",
      content: "This is the second ticket.",
      status: "OPEN",
    },
    {
      // id: "3",
      title: "Ticket 3",
      content: "This is the third ticket.",
      status: "IN_PROGRESS",
    },
  ] as const;

async function seed() {
  console.time("DB Seed");
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: initialTickets,
  });
  console.timeEnd("DB Seed");
}

seed();
