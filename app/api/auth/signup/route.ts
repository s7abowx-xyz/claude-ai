import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, username, email, password } = await req.json();

  if (!name || !username || !email || !password) {
    return NextResponse.json({ error: "كل الحقول مطلوبة" }, { status: 400 });
  }

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    return NextResponse.json(
      { error: "اليوزرنيم لازم يكون بين 3 و20 حرف، إنجليزي وأرقام وأندر سكور بس" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "كلمة المرور لازم تكون 8 حروف على الأقل" }, { status: 400 });
  }

  const existingEmail = await prisma.user.findUnique({ where: { email } });
  if (existingEmail) {
    return NextResponse.json({ error: "الإيميل ده مستخدم بالفعل" }, { status: 409 });
  }

  const existingUsername = await prisma.user.findUnique({ where: { username } });
  if (existingUsername) {
    return NextResponse.json({ error: "اليوزرنيم ده مأخوذ" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, username, email, passwordHash },
  });

  return NextResponse.json({ success: true, userId: user.id });
}
