import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unathorized' }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        userId: session.user?.id!,
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
