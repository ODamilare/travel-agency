import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { token } = await req.json();

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return new Response("Invalid token", { status: 400 });
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { token },
  });

  return new Response("Verified", { status: 200 });
}