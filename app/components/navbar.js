"use client";
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open

  // Define link data for both desktop and mobile
  const links = [
    { href: "/", label: "Home" },
    { href: "/prices", label: "Plans" },
    { href: "/qr", label: "QR Options" },
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.png"
              alt="CodeSnap"
              className="h-10 w-10"
            />
            <span className="text-lg font-bold ml-2">CodeSnap</span>
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <span className="h-6 w-6">X</span> // Replace with a close icon if desired
            ) : (
              <span className="h-6 w-6">☰</span> // Replace with a hamburger icon if desired
            )}
          </button>
        </div>

        {/* Menu links for desktop */}
        <div className={`hidden md:flex space-x-8`}>
          {links.slice(0, 3).map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-2 hover:text-gray-300">
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Login/Register links for desktop */}
        <div className="hidden md:flex space-x-4">
          {links.slice(3).map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-2 hover:text-gray-300">
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-2 hover:text-gray-300">
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
