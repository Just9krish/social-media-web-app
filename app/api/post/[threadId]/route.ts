import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { threadId: string } },
) {
  try {
    if (!params.threadId) {
      return NextResponse.json({ error: 'Invalid thread id' }, { status: 400 });
    }

    const thread = await prisma.thread.findUnique({
      where: {
        id: params.threadId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        comment: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ thread }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
