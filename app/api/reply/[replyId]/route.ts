import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../../auth/[...nextauth]/options';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { replyId: string } },
) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!params.replyId) {
      return NextResponse.json({ error: 'Invalid reply id' }, { status: 400 });
    }

    const reply = await prisma.comment.findFirst({
      where: {
        id: params.replyId,
        userId: session.user?.id!,
      },
    });

    if (!reply) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.comment.delete({
      where: {
        id: params.replyId,
      },
    });

    return NextResponse.json(
      { message: 'Reply deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
