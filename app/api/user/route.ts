import { NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unathorize' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: session.user?.id!,
        },
      },
      select: {
        username: true,
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
