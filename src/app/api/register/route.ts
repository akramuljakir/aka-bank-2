import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create the customer with an initial bank account
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'CUSTOMER',
                customer: {
                    create: {
                        accounts: {
                            create: {
                                accountNumber: Math.floor(100000 + Math.random() * 900000).toString(), // Generate random 6-digit account number
                                balance: 0,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
