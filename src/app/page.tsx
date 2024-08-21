"use client"

import { useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Add a top padding for the content to prevent overlap with the fixed navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Welcome to AkaBank
              </h1>
              <p className="text-lg mb-8">
                Your trusted partner in banking. Manage your finances, transfer money, and more!
              </p>
              <a href="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 font-semibold">
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <Image src="/transfer.svg" alt="Transfer Money" width={80} height={80} />
                <h3 className="text-xl font-bold mt-4">Money Transfers</h3>
                <p className="text-gray-600 mt-2">Easily transfer money to anyone, anytime.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <Image src="/balance.svg" alt="Check Balance" width={80} height={80} />
                <h3 className="text-xl font-bold mt-4">Check Balance</h3>
                <p className="text-gray-600 mt-2">Always stay up to date with your account balance.</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <Image src="/secure.svg" alt="Secure" width={80} height={80} />
                <h3 className="text-xl font-bold mt-4">Secure Banking</h3>
                <p className="text-gray-600 mt-2">We ensure your transactions are safe and secure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} AkaBank. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  );
}
