// src/app/layout.tsx

import { useSession } from 'next-auth/react';
import Providers from '../components/Providers'; // Import the Providers wrapper
import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          <Navbar /> {/* Add the Navbar component */}
          <main className="container mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
