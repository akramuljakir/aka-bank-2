'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const EmployeeDashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [customerEmail, setCustomerEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [amount, setAmount] = useState('');

    // Redirect unauthorized users to an unauthorized page
    if (!session || session.user?.role !== 'EMPLOYEE') {
        router.push('/unauthorized');
        return null;
    }

    // Create customer API call
    const handleCreateCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/employee/createCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: customerEmail,
                password,
            }),
        });

        if (res.ok) {
            alert('Customer created successfully');
            setCustomerEmail('');
            setPassword('');
        } else {
            alert('Failed to create customer');
        }
    };

    // Deposit money API call
    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/employee/depositMoney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNumber,
                amount: parseFloat(amount),
            }),
        });

        if (res.ok) {
            alert('Deposit successful');
            setAccountNumber('');
            setAmount('');
        } else {
            alert('Failed to deposit money');
        }
    };

    // Withdraw money API call
    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/employee/withdrawMoney', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accountNumber,
                amount: parseFloat(amount),
            }),
        });

        if (res.ok) {
            alert('Withdrawal successful');
            setAccountNumber('');
            setAmount('');
        } else {
            alert('Failed to withdraw money');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

            {/* Form to create a customer */}
            <form onSubmit={handleCreateCustomer} className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Create Customer</h2>
                <input
                    type="email"
                    placeholder="Customer Email"
                    className="mb-4 p-2 border w-full"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 p-2 border w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Create Customer
                </button>
            </form>

            {/* Form to deposit money */}
            <form onSubmit={handleDeposit} className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Deposit Money</h2>
                <input
                    type="text"
                    placeholder="Account Number"
                    className="mb-4 p-2 border w-full"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="mb-4 p-2 border w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                    Deposit
                </button>
            </form>

            {/* Form to withdraw money */}
            <form onSubmit={handleWithdraw} className="bg-white p-6 rounded shadow-md mb-6">
                <h2 className="text-xl font-bold mb-4">Withdraw Money</h2>
                <input
                    type="text"
                    placeholder="Account Number"
                    className="mb-4 p-2 border w-full"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="mb-4 p-2 border w-full"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">
                    Withdraw
                </button>
            </form>
        </div>
    );
};

export default EmployeeDashboard;
