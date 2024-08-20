import Providers from '../components/Providers'; // Import the Providers wrapper
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers> {/* Wrap the app in Providers to manage session on the client side */}
          <Navbar />
          <main className="container mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
