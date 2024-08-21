"use client"
import { useState } from 'react';

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            {/* Navbar */}
            < nav className="bg-white shadow-lg fixed w-full top-0 left-0 z-10" >
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    {/* Brand Name */}
                    <a href="/" className="text-2xl font-bold text-blue-600">AkaBank</a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="/about" className="text-gray-700 hover:text-blue-600">About Us</a>
                        <a href="/services" className="text-gray-700 hover:text-blue-600">Services</a>
                        <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
                        <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
                        <a href="/register" className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500">Sign Up</a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="mobile-menu-button">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {
                    menuOpen && (
                        <div className="mobile-menu md:hidden">
                            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Home</a>
                            <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">About Us</a>
                            <a href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Services</a>
                            <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Contact</a>
                            <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">Login</a>
                            <a href="/register" className="block px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-500">Sign Up</a>
                        </div>
                    )
                }

            </nav >
        </>
    )
}