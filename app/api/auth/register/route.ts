import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (exist) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    // Check if this is the first user (will be admin)
    const userCount = await prisma.user.count();
    const isFirstUser = userCount === 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: isFirstUser ? "admin" : "user",
        isApproved: isFirstUser, // First user (admin) is automatically approved
      }
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.log("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 