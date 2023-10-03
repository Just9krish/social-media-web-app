import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { CustomSession, authOptions } from '../auth/[...nextauth]/options';
import validateData, { ValidationError } from '@/lib/resouceValidator';
import { createThreadSchema } from '@/schema/ThreadSchema';
import ImageValidator from '@/lib/imageValidator';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      // return NextResponse.redirect("/login")
      return NextResponse.json({ message: 'Unathorize' }, { status: 403 });
    }

    const formData = await req.formData();

    const data = {
      content: formData.get('content'),
      image: '',
    };

    const payload = validateData(createThreadSchema, data);
    const image = formData.get('image') as Blob | null;

    if (image) {
      const isNotValidImg = ImageValidator({
        name: image.name,
        size: image.size,
      });

      if (isNotValidImg) {
        return NextResponse.json({ error: isNotValidImg }, { status: 400 });
      }

      try {
        const buffer = Buffer.from((await image?.arrayBuffer()) as ArrayBuffer);
        const uploadDir = join(process.cwd(), 'public/uploads');
        const fileName = `${Date.now()}-${image?.name}`;
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        data.image = fileName;
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    await prisma.thread.create({
      data: {
        content: payload.content,
        image: data.image ?? null,
        userId: session.user?.id!,
      },
    });

    return NextResponse.json(
      {
        message: 'Thread created successfully!',
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    if (error instanceof ValidationError) {
      // Handle the validation error
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      // Handle other unexpected errors
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (!session) {
      // return NextResponse.redirect("/login")
      return NextResponse.json({ message: 'Unathorize' }, { status: 403 });
    }

    const threads = await prisma.thread.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ threads }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
