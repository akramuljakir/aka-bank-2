import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Bank App</h1>
      <p className="mb-6 text-lg">Your secure banking system for Admins, Employees, and Customers.</p>

      <div className="space-x-4">
        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
        <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register as Customer</Link>
      </div>
    </div>
  );
};

export default HomePage;
