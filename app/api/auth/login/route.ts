import prisma from "@/lib/prisma";
import validate, { ValidationError } from "@/lib/resouceValidator";
import { userLoginSchema } from "@/schema/AuthSchema";
import { NextRequest, NextResponse } from "next/server";
import { compareSync, } from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const data = validate(userLoginSchema, body);

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!isUserExist) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        const isMatch = compareSync(data.password, isUserExist.password!);

        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        return NextResponse.json({ status: 200, message: "Logged in successfully" });

    } catch (error: any) {
        if (error instanceof ValidationError) {
            // Handle the validation error
            return NextResponse.json(error.message);
        } else {
            console.log(error);
            // Handle other unexpected errors
            return NextResponse.json(error.message);
        }
    }
}