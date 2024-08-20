import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== 'EMPLOYEE') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { accountNumber, amount } = await req.json();

        // Find the bank account by account number
        const bankAccount = await prisma.bankAccount.findUnique({
            where: { accountNumber },
        });

        if (!bankAccount) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        // Update the balance
        const updatedAccount = await prisma.bankAccount.update({
            where: { accountNumber },
            data: {
                balance: bankAccount.balance + amount,
            },
        });

        return NextResponse.json({ updatedAccount });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
}
