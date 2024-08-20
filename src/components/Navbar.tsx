'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return <div>Loading...</div>; // Show a loading state while the session is being fetched
    }

    // If no session exists, show login
    if (!session) {
        return (
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-lg font-bold">
                        Bank App
                    </Link>
                    <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded">
                        Login
                    </Link>
                </div>
            </nav>
        );
    }

    // Display dashboard links based on the user role
    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-lg font-bold">
                    Bank App
                </Link>
                <div>
                    <span className="mr-4">Welcome, {session.user?.email}</span>
                    {session.user?.role === 'ADMIN' && (
                        <Link href="/admin/dashboard" className="mr-4">
                            Admin Dashboard
                        </Link>
                    )}
                    {session.user?.role === 'EMPLOYEE' && (
                        <Link href="/employee/dashboard" className="mr-4">
                            Employee Dashboard
                        </Link>
                    )}
                    {session.user?.role === 'CUSTOMER' && (
                        <Link href="/customer/dashboard" className="mr-4">
                            Customer Dashboard
                        </Link>
                    )}
                    <button
                        onClick={() => signOut()}
                        className="bg-red-500 px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
