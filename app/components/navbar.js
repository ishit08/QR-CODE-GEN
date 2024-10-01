"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HomeIcon, CurrencyDollarIcon, DocumentTextIcon, ArrowRightIcon, UserPlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Importing icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open

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
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu links for desktop */}
        <div className={`hidden md:flex space-x-8`}>
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/prices" className="flex items-center space-x-2 hover:text-gray-300">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Plans</span>
          </Link>
          <Link href="/qr" className="flex items-center space-x-2 hover:text-gray-300">
            <DocumentTextIcon className="h-5 w-5" />
            <span>QR Options</span>
          </Link>
        </div>

        {/* Login/Register links for desktop */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="flex items-center space-x-2 hover:text-gray-300">
            <ArrowRightIcon className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <Link href="/register" className="flex items-center space-x-2 hover:text-gray-300">
            <UserPlusIcon className="h-5 w-5" />
            <span>Register</span>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/prices" className="flex items-center space-x-2 hover:text-gray-300">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Plans</span>
          </Link>
          <Link href="/qr" className="flex items-center space-x-2 hover:text-gray-300">
            <DocumentTextIcon className="h-5 w-5" />
            <span>QR Options</span>
          </Link>
          <Link href="/login" className="flex items-center space-x-2 hover:text-gray-300">
            <ArrowRightIcon className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <Link href="/register" className="flex items-center space-x-2 hover:text-gray-300">
            <UserPlusIcon className="h-5 w-5" />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
