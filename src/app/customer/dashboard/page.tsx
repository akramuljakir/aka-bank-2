"use client";

import { useEffect, useState } from 'react';

export default function CustomerDashboard() {
    const [accountDetails, setAccountDetails] = useState({ accountNumber: '', balance: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch account details from the API
    useEffect(() => {
        async function fetchAccountDetails() {
            try {
                const response = await fetch('/api/customer/viewBalance');
                const data = await response.json();

                console.log('API Response:', data); // Log API response for debugging

                if (response.ok) {
                    setAccountDetails({ accountNumber: data.accountNumber, balance: data.balance });
                } else {
                    setError('Failed to fetch account details.');
                    console.log('Error response:', data);
                }
            } catch (error) {
                setError('Error fetching account details.');
                console.error('Fetch Error:', error); // Log fetch error
            } finally {
                setLoading(false);
            }
        }

        fetchAccountDetails();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

            <h2 className="text-lg font-bold mb-4">Your Accounts:</h2>
            <ul>
                <li>Account Number: {accountDetails.accountNumber}</li>
                <li>Balance: ${accountDetails.balance.toFixed(2)}</li>
            </ul>

            <form className="bg-white p-6 rounded shadow-md mt-6">
                <h2 className="text-xl font-bold mb-4">Transfer Money</h2>
                <input type="text" placeholder="Your Account Number" value={accountDetails.accountNumber} readOnly className="mb-4 p-2 border w-full" />
                <input type="text" placeholder="Recipient Account Number" className="mb-4 p-2 border w-full" />
                <input type="number" placeholder="Amount" className="mb-4 p-2 border w-full" />
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Transfer</button>
            </form>
        </main>
    );
}
