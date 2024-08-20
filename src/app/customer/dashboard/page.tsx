'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CustomerDashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [recipientAccount, setRecipientAccount] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load

        if (!session || session.user?.role !== 'CUSTOMER') {
            router.push('/unauthorized');
        }
    }, [session, status, router]);

    // Fetch customer accounts
    useEffect(() => {
        const fetchAccounts = async () => {
            const res = await fetch('/api/customer/viewBalance');
            const data = await res.json();
            setAccounts(data.accounts || []);
        };

        if (session?.user?.role === 'CUSTOMER') {
            fetchAccounts();
        }
    }, [session]);

    // Fetch customer transactions (statements)
    const handleViewStatements = async (accountNumber) => {
        const res = await fetch(`/api/customer/viewStatement?accountNumber=${accountNumber}`);
        const data = await res.json();
        setTransactions(data.transactions || []);
    };

    // Transfer money between accounts
    const handleTransfer = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/customer/transferMoney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fromAccount: accountNumber,
                toAccount: recipientAccount,
                amount: parseFloat(amount),
            }),
        });

        if (res.ok) {
            alert('Transfer successful');
            setAccountNumber('');
            setRecipientAccount('');
            setAmount('');
        } else {
            alert('Transfer failed');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
            <h2 className="text-lg font-bold mb-4">Your Accounts:</h2>

            <ul>
                {accounts.map((account) => (
                    <li key={account.accountNumber} className="mb-4 p-4 border rounded">
                        <p>Account Number: {account.accountNumber}</p>
                        <p>Balance: ${account.balance.toFixed(2)}</p>
                        <button
                            onClick={() => handleViewStatements(account.accountNumber)}
                            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                        >
                            View Statements
                        </button>
                    </li>
                ))}
            </ul>

            {transactions.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">Account Statements:</h2>
                    <ul>
                        {transactions.map((transaction) => (
                            <li key={transaction.id} className="mb-2">
                                {transaction.type}: ${transaction.amount.toFixed(2)} on {new Date(transaction.createdAt).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleTransfer} className="bg-white p-6 rounded shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Transfer Money</h2>
                <input
                    type="text"
                    placeholder="Your Account Number"
                    className="mb-4 p-2 border w-full"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Recipient Account Number"
                    className="mb-4 p-2 border w-full"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="mb-4 p-2 border w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                    Transfer
                </button>
            </form>
        </div>
    );
};

export default CustomerDashboard;
