import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found in DB" }, { status: 404 });
    }

    if (!params?.id) {
      return NextResponse.json({ error: "Scan ID is missing" }, { status: 400 });
    }

    const scanResult = await prisma.scanResult.findFirst({
      where: {
        id: params.id,
        userId: dbUser.id,
      },
    });

    if (!scanResult) {
      return NextResponse.json({ error: "Scan result not found" }, { status: 404 });
    }

    return NextResponse.json(scanResult);
  } catch (err) {
    console.error("Scan Result Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
