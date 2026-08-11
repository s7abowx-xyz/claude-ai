import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "لازم تسجل دخول" }, { status: 401 });
  }

  const { username } = await req.json();
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return NextResponse.json(
      { error: "اليوزرنيم لازم يكون بين 3 و20 حرف، إنجليزي وأرقام وأندر سكور بس" },
      { status: 400 }
    );
  }

  const taken = await prisma.user.findUnique({ where: { username } });
  if (taken) {
    return NextResponse.json({ error: "اليوزرنيم ده مأخوذ" }, { status: 409 });
  }

  await prisma.user.update({
    where: { email: session.user.email },
    data: { username },
  });

  return NextResponse.json({ success: true });
}
