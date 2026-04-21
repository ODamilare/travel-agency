// app/api/bookings/route.ts
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { dealId, userId } = await req.json();

  const booking = await prisma.booking.create({
    data: {
      dealId,
      userId,
    },
  });

  return Response.json(booking);
}