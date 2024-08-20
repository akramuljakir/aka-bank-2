import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'CUSTOMER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fromAccount, toAccount, amount } = await req.json();

    // Find the source account
    const sourceAccount = await prisma.bankAccount.findUnique({
        where: { accountNumber: fromAccount },
    });

    if (!sourceAccount || sourceAccount.balance < amount) {
        return NextResponse.json({ error: 'Insufficient balance or account not found' }, { status: 400 });
    }

    // Find the destination account
    const destinationAccount = await prisma.bankAccount.findUnique({
        where: { accountNumber: toAccount },
    });

    if (!destinationAccount) {
        return NextResponse.json({ error: 'Recipient account not found' }, { status: 404 });
    }

    // Transfer the money
    await prisma.$transaction([
        prisma.bankAccount.update({
            where: { accountNumber: fromAccount },
            data: { balance: sourceAccount.balance - amount },
        }),
        prisma.bankAccount.update({
            where: { accountNumber: toAccount },
            data: { balance: destinationAccount.balance + amount },
        }),
        prisma.transaction.create({
            data: {
                accountId: sourceAccount.id,
                amount,
                type: 'TRANSFER',
            },
        }),
        prisma.transaction.create({
            data: {
                accountId: destinationAccount.id,
                amount,
                type: 'TRANSFER',
            },
        }),
    ]);

    return NextResponse.json({ message: 'Transfer successful' });
}
