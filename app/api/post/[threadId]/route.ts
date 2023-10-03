import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { join } from 'path';
import { rmSync } from 'fs';

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { threadId: string } },
) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!params.threadId) {
      return NextResponse.json({ error: 'Invalid thread id' }, { status: 400 });
    }

    const thread = await prisma.thread.findFirst({
      where: {
        id: params.threadId,
        userId: session.user?.id!,
      },
    });

    if (!thread) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // remove uploaded file if any
    if (thread.image) {
      const dir = join(process.cwd(), 'public', '/uploads');
      const filePath = `${dir}/${thread.image}`;
      rmSync(filePath, { force: true });
    }

    await prisma.thread.delete({
      where: {
        id: params.threadId,
      },
    });

    return NextResponse.json(
      { message: 'Thread deleted successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
