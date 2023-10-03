import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import validateData from '@/lib/resouceValidator';
import { createReplySchema } from '@/schema/ThreadSchema';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unathorize' }, { status: 401 });
    }

    const data = await req.json();

    const payload = validateData(createReplySchema, data);

    // increase comment count of thread

    await prisma.thread.update({
      where: {
        id: payload.threadId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });

    // add comment in db
    await prisma.comment.create({
      data: {
        userId: session.user?.id!,
        content: payload.content,
        threadId: payload.threadId,
      },
    });

    return NextResponse.json(
      { message: 'Replied successfully' },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
