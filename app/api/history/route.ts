import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const history = await prisma.scanResult.findMany({
      where: {
        userId: dbUser.id,
      },
      select: {
        id: true,
        hasDisease: true,
        diseaseName: true,
        plantType: true,
        confidence: true,
        description: true,
        causes: true,
        symptoms: true,
        treatment: true,
        recommendations: true,
        images: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10, // Optional pagination
      skip: 0,  // Optional pagination logic
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error('History Error:', error);
    return NextResponse.json({
      error: 'Failed to fetch history',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}