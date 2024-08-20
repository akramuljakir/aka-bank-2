'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!session || session.user?.role !== 'ADMIN') {
        router.push('/unauthorized');
        return null;
    }

    const handleCreateEmployee = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/admin/createEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (res.ok) {
            alert('Employee created successfully');
            setEmail('');
            setPassword('');
        } else {
            alert('Failed to create employee');
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <form onSubmit={handleCreateEmployee} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Create Employee</h2>
                <input
                    type="email"
                    placeholder="Employee Email"
                    className="mb-4 p-2 border w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Employee Password"
                    className="mb-4 p-2 border w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Create Employee
                </button>
            </form>
        </div>
    );
};

export default AdminDashboard;
