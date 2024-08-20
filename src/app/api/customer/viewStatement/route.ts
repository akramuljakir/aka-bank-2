import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'CUSTOMER') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const accountNumber = searchParams.get('accountNumber');
    if (accountNumber === null) {
        // handle the case where accountNumber is null
        // for example, return an error response
        return NextResponse.json({ error: 'Account number is required' }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
        where: {
            account: {
                accountNumber,
            },
        },
    });
    return NextResponse.json({ transactions });
}
