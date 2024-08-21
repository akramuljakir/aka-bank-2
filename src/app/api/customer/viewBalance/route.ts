import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';  // Ensure this points to your Prisma instance

export async function GET(req: Request) {
    try {
        // Simulate fetching the current logged-in user's account (replace with actual session user ID or logic)
        const userId = 1; // This is a placeholder. You need to fetch the correct user ID from session or authentication.

        // Fetch the account details from the database using Prisma
        const account = await prisma.account.findUnique({
            where: { userId },
            select: {
                accountNumber: true,
                balance: true,
            },
        });

        if (!account) {
            return NextResponse.json({ error: 'Account not found' }, { status: 404 });
        }

        return NextResponse.json({ accountNumber: account.accountNumber, balance: account.balance });
    } catch (error) {
        console.error('Error fetching account details:', error);
        return NextResponse.json({ error: 'Failed to fetch account details' }, { status: 500 });
    }
}
