import prisma from '@/lib/prisma';
import validate, { ValidationError } from '@/lib/resouceValidator';
import { userSignupSchema } from '@/schema/AuthSchema';
import { NextRequest, NextResponse } from 'next/server';
import { genSalt, hashSync } from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = validate(userSignupSchema, body);

    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isEmailExist) {
      return NextResponse.json(
        {
          message: 'Email already is in use',
        },
        { status: 400 },
      );
    }

    const isUsernameExist = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
      select: {
        id: true,
      },
    });

    if (isUsernameExist) {
      return NextResponse.json(
        {
          message: 'Username already is in use',
        },
        { status: 400 },
      );
    }

    const salt = await genSalt(+process.env.SALT_WORK_FACTOR!);
    data.password = hashSync(data.password, salt);

    const { email, name, password, username } = data;

    await prisma.user.create({ data: { email, name, username, password } });

    return NextResponse.json({
      status: 200,
      message: 'You have successfully signed up. Please login to continue.',
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      // Handle the validation error
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      console.log(error);
      // Handle other unexpected errors
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
